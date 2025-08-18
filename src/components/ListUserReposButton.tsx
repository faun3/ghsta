"use client";

import { useState } from "react";
import { Button } from "./shadcn/button";
import { Input } from "./shadcn/input";

export function ListUserReposButton() {
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
        onClick={() => {
          if (!username.trim()) {
            console.error("Please enter a username");
            return;
          }
        }}
      >
        List User Repos
      </Button>
    </div>
  );
}
