# REDIS => REmote DIctionary(key-value pair) Server 
* store object in RAM (in memory)
* low latency
* high throughput
# pubsub in redis

## Run the script bellow

```bash
# run docker
docker-compose up -d

# install dependencies
pnpm add

# run the script
pnpm run dev
pnpm run redis
```

## Environment veriable

```env
REDIS_URL=redis://localhost:6379
PORT=4000
```

## endpoint

> http://localhost:4000/notify

```json
{
  "title": "Pubsub demo",
  "message": "Testing pubsub"
}
```
## best practice:
```js
const exists = await redis.exists(`sessions:${cartSessionId}`);
// instead of this:
const exists = await redis.exists(cartSessionId)
```
here `sessions` are called `key prefix`.

## redis vs ioredis

### redis
```ts
import { createClient } from "redis";

const redis = createClient({
  url: "redis://localhost:6379",
});

await redis.connect();

await redis.set("name", "Shojib");
const name = await redis.get("name");

await redis.quit();
```

### ioredis
```ts
import Redis from "ioredis";

const redis = new Redis("redis://localhost:6379");

await redis.set("name", "Shojib");
const name = await redis.get("name");
```
