"use client";

import { useState } from "react";

export default function Page() {
  const [x, setX] = useState(0);

  return (
    <div>
      <p>{x}</p>
      <button onClick={() => setX((past) => past + 1)}>Increase</button>
    </div>
  );
}
