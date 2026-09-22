"use client";

import { useActionState } from "react";
import { loginStudio } from "@/app/studio/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginStudio, null);

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-4">
      <label className="block">
        <span className="kicker mb-2 block">Password</span>
        <input
          autoFocus
          className="studio-input"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      {state?.error ? (
        <p className="m-0 text-signal" role="alert">
          {state.error}
        </p>
      ) : null}
      <button className="btn btn-fill" disabled={pending} type="submit">
        {pending ? "Checking" : "Enter"}
      </button>
    </form>
  );
}
