import "dotenv/config";

export const REDIS_URL =
  String(process.env.REDIS_URL) || "redis://localhost:6379";
export const PORT = Number(process.env.PORT) || 4000;
