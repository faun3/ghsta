"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { authClient } from "@/lib/auth-client";
import { AvatarFallback, AvatarImage } from "./shadcn/avatar";
import { Skeleton } from "./shadcn/skeleton";

export function UserAvatar() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  const avatarUrl = session?.user.image || "";

  return (
    <div className="size-10 rounded-full overflow-clip">
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
