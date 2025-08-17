import dotenv from "dotenv";

// TODO: only load this in dev mode
dotenv.config({ path: ".env.local" });

export const POSTGRES_URL = process.env.POSTGRES_URL!;
export const POSTGRES_USER = process.env.POSTGRES_USER!;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD!;
export const POSTGRES_HOST = process.env.POSTGRES_HOST!;
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
export const POSTGRES_DB = process.env.POSTGRES_DB!;
