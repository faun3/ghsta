"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./shadcn/button";

export function LogOutButton() {
  return (
    <Button
      onClick={async () => {
        await authClient.signOut();
      }}
    >
      Log Out
    </Button>
  );
}
