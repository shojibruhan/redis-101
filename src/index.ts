import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./config/index.js";
import {
  NotificationType,
  publishNotification,
  subscribeNotification,
} from "./notification.subscriber.js";
import { connectRedis, disConnectRedis } from "./redis/client.js";

const app = express();
app.use(express.json());

await connectRedis();
await subscribeNotification();

app.get("/health", (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(200).json({
    message: "OK!",
  });
});

app.post("/notify", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, message } = req.body;
    const notification: NotificationType = {
      id: Date.now().toString(),
      title,
      message,
      createdAt: new Date().toISOString(),
    };

    await publishNotification(notification);

    return res.status(201).json({
      message: "Notification Published",
      data: {
        id: notification.id,
      },
    });
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log("Server is running in Port: ", PORT);
});

process.on("SIGINT", async () => {
  await disConnectRedis();
  process.exit(1);
});
