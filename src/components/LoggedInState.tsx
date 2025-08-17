"use client";

import { authClient } from "@/lib/auth-client";

export function LoggedInState() {
  const { data: session } = authClient.useSession();

  return (
    <div>
      <p>{session?.user.id}</p>
    </div>
  );
}
