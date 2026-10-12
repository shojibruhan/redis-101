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
