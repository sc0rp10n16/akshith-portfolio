import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  isValidSessionToken,
  STUDIO_COOKIE,
} from "@/lib/studio/session";

export async function requireStudioSession() {
  const token = (await cookies()).get(STUDIO_COOKIE)?.value;
  if (!(await isValidSessionToken(token))) {
    redirect("/studio");
  }
}

export async function hasStudioSession(): Promise<boolean> {
  const token = (await cookies()).get(STUDIO_COOKIE)?.value;
  return isValidSessionToken(token);
}
