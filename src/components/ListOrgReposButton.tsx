"use client";

import { useState } from "react";
import { Button } from "./shadcn/button";
import { Input } from "./shadcn/input";

export function ListOrgReposButton() {
  const [org, setOrg] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter a GitHub organization name"
        value={org}
        onChange={(e) => setOrg(e.target.value)}
      />
      <Button
        onClick={() => {
          if (!org.trim()) {
            console.error("Please enter a organization name");
            return;
          }
        }}
      >
        List Organization Repos
      </Button>
    </div>
  );
}
