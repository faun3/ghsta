import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import dotenv from "dotenv";

if (process.env.DRIZZLE_ENV_MODE === "dev") {
  dotenv.config({
    path: "../.env.local",
  });
}

export const db = drizzle(process.env.POSTGRES_URL!);
