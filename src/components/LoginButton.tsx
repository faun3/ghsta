"use client";

import { authClient } from "@/lib/auth-client";

export default function LoginButton() {
  return (
    <button
      onClick={async () => {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/",
        });
      }}
    >
      Sign in with GitHub
    </button>
  );
}
