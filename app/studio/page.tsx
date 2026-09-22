import { LoginForm } from "@/components/studio/login-form";
import { hasStudioSession } from "@/lib/studio/auth";
import { redirect } from "next/navigation";

export default async function StudioLoginPage() {
  if (await hasStudioSession()) {
    redirect("/studio/resumes");
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-center px-6 py-16">
      <p className="kicker mb-4">Studio</p>
      <h1 className="mb-8 font-sans text-[32px] font-bold leading-none">Enter</h1>
      <LoginForm />
    </main>
  );
}
