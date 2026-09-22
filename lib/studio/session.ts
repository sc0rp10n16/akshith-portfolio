export const STUDIO_COOKIE = "studio_session";
export const STUDIO_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function sessionSecret(): string | null {
  return process.env.STUDIO_SESSION_SECRET ?? null;
}

function bytesToBase64Url(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return bytesToBase64Url(signature);
}

export async function createSessionToken(): Promise<string> {
  const secret = sessionSecret();
  if (!secret) {
    throw new Error("STUDIO_SESSION_SECRET is not set");
  }

  const payload = String(Date.now() + STUDIO_MAX_AGE_SECONDS * 1000);
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

export async function isValidSessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const secret = sessionSecret();
  if (!secret) {
    return false;
  }

  const separator = token.lastIndexOf(".");
  if (separator <= 0) {
    return false;
  }

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expiresAt = Number(payload);

  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return false;
  }

  const expected = await sign(payload, secret);
  return timingSafeEqual(signature, expected);
}

export function studioCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/studio",
    maxAge: STUDIO_MAX_AGE_SECONDS,
  };
}
