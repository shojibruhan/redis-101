// import "dotenv/config";
// import { createClient } from "redis";
// import { REDIS_URL } from "../config/index.js";

import { createClient } from "redis";
import { REDIS_URL } from "../config/index.js";

// const redisClient = createClient({
//   url: REDIS_URL,
// });

// const run = async () => {
//   await redisClient.connect();
//   console.log("✅ Redis is connected");
//   //   console.log("Ping: ", await redisClient.ping());
//   const hashKey = "myHash";
//   await redisClient.hSet(hashKey, {
//     name: "shojib",
//     age: 34,
//   });
//   const li = "myList";
//   await redisClient.lPush(li, "hello");
//   await redisClient.lPush(li, "world");
//   await redisClient.lPush(li, "35");
//   const res = await redisClient.hGetAll(hashKey);
//   const liRes = await redisClient.lRange(li, 0, -1);

//   console.log(liRes);
//   await redisClient.quit();
// };

// run().catch((err) => {
//   console.log("Failed to connect", err);
//   process.exit(1);
// });

// await connectRedis();
// const cacheKey = "products";
// const timeToLive = 60;

// let myProducts = ["Laptop", "Mobile", "Tab", "Solar"];
// console.log("My Products: ", myProducts);

// let initialData = await redisClient.get(cacheKey);
// console.log("initialData: ", initialData);

// await redisClient.del(cacheKey);
// initialData = await redisClient.get(cacheKey);

// myProducts.push("Headphone");

// if (initialData) {
//   console.log("🟢 Cached the data");
//   console.log("data", JSON.parse(initialData));
// } else {
//   console.log("❌ No data found!");
//   const freshProduct = myProducts;
//   await redisClient.setEx(cacheKey, timeToLive, JSON.stringify(freshProduct));
// await redisClient.set(cacheKey, JSON.stringify(freshProduct), {
//   expiration: {
//     type: "EX",
//     value: timeToLive,
//   },
// });
// }

type Data = {
  title: string;
  message: string;
};

const channel = "notification";

const publisher = createClient({ url: REDIS_URL });
const subscriber = createClient({ url: REDIS_URL });

await publisher.connect();
await subscriber.connect();

console.log("Publisher Connected");
console.log("Ping: -->", await publisher.ping());
console.log("Subscriber Connected");
console.log("<--Ping: ", await subscriber.ping());

await subscriber.subscribe(channel, (message) => {
  const data: Data = JSON.parse(message);
  console.log("subscriber recieve the message");
  console.log("title: ", data.title);
  console.log("message: ", data.message);
});

console.log("channel name: ", channel);

const event: Data = {
  title: "Pub/sub",
  message: "Practice demo of pub/sub concept",
};

const reciever = await publisher.publish(channel, JSON.stringify(event));

await new Promise((resolve) => setTimeout(resolve, 300));
console.log("reciever: ", reciever);
await subscriber.unsubscribe();
await publisher.quit();
await subscriber.quit();

console.log("Done for the day!");
