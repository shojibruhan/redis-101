import { createClient } from "redis";
import { REDIS_URL } from "../config/index.js";

export const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Redis is connected");
});
redisClient.on("ready", () => {
  console.log("Redis is ready");
});
redisClient.on("error", (error) => {
  console.log("Redis connection error", error);
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  const pong = await redisClient.ping();
  console.log("Ping: ", pong);
};

export const disConnectRedis = async (): Promise<void> => {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
};
