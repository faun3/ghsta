"use client";

import { useState } from "react";
import { listUserOrgs } from "@/requests/list-user-orgs";
import { Button } from "./shadcn/button";
import { Input } from "./shadcn/input";

export function ListUserOrgsButton() {
  const [username, setUsername] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        onClick={async () => {
          if (!username.trim()) {
            console.error("Please enter a username");
            return;
          }
          console.log(await listUserOrgs(username));
        }}
      >
        List Orgs
      </Button>
    </div>
  );
}
