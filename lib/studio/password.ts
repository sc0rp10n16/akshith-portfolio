import { timingSafeEqual } from "node:crypto";

export function passwordMatches(input: string): boolean {
  const expected = process.env.STUDIO_PASSWORD;
  if (!expected) {
    return false;
  }

  const given = Buffer.from(input);
  const want = Buffer.from(expected);

  if (given.length !== want.length) {
    timingSafeEqual(want, want);
    return false;
  }

  return timingSafeEqual(given, want);
}
