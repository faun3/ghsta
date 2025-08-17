// TODO: maybe call this file something else

import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.POSTGRES_URL!);
