"use client";

import { listUserRepos } from "@/requests/list-user-repos";
import { Button } from "./shadcn/button";

export function ListUserReposButton() {
  return (
    <Button
      onClick={async () => {
        console.log(await listUserRepos());
      }}
    >
      List Repos
    </Button>
  );
}
