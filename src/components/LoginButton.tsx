"use client";

import { GITHUB_OAUTH_PROVIDER } from "@/constants/oauth-providers";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/shadcn/button";
import { HOME_ROUTE } from "@/routes/routes";

export function LoginButton() {
  return (
    <Button
      onClick={async () => {
        await authClient.signIn.social({
          provider: GITHUB_OAUTH_PROVIDER,
          callbackURL: HOME_ROUTE,
        });
      }}
    >
      Sign in with GitHub
    </Button>
  );
}
