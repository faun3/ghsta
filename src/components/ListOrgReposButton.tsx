"use client";

import { useState } from "react";
import { Button } from "./shadcn/button";
import { Input } from "./shadcn/input";

export function ListOrgReposButton() {
  const [org, setOrg] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (!org.trim()) {
      setError("Please enter an organization name");
      return;
    }
    setError(null); // clear error if input is valid
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter GitHub organization name"
          value={org}
          onChange={(e) => {
            setOrg(e.target.value);
            if (error) setError(null); // clear error when typing
          }}
        />
        <Button onClick={handleClick}>List Org Repos</Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
