import { createClient } from "redis";
import { REDIS_URL } from "./config/index.js";
import { redisClient } from "./redis/client.js";

const channel = "notification";

export type NotificationType = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
};

export const publishNotification = async (
  notification: NotificationType,
): Promise<void> => {
  await redisClient.publish(channel, JSON.stringify(notification));
};

const subscribeClient = createClient({ url: REDIS_URL });

subscribeClient.on("error", (err) => {
  console.log("Redis subscriber error: ", err);
});

export const subscribeNotification = async () => {
  if (subscribeClient.isOpen) {
    return;
  }
  await subscribeClient.connect();
  await subscribeClient.subscribe(channel, (message) => {
    try {
      const notification = JSON.parse(message) as NotificationType;
      console.log("new notification: ");
      console.log("title: ", notification.title);
      console.log("message: ", notification.message);
      console.log("Created At: ", notification.createdAt);
    } catch (error) {
      console.log("error getting msg", error);
    }
  });
};

const main = async () => {
  try {
    await subscribeNotification();
  } catch (err) {
    console.log("Subscriber error: ", err);
  }
};

main();
