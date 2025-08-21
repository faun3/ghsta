"use client";

import { useState } from "react";
import { Button } from "./shadcn/button";
import { Input } from "./shadcn/input";

export function ListUserReposButton() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    setError(null); // clear error if input is valid
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (error) setError(null); // clear error when typing
          }}
        />
        <Button onClick={handleClick}>List User Repos</Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
