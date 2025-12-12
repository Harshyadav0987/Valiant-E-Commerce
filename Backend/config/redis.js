//for production redis server

import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  tls: process.env.REDIS_URL.startsWith("rediss://") ? {} : undefined,
});

export default redis;

//for local redis server

// import { createClient } from "redis";

// const client = createClient({
//   url: "redis://localhost:6379",
// });

// client.on("connect", () => console.log("🟢 Redis connected"));
// client.on("error", (err) => console.error("🔴 Redis error:", err));

// await client.connect();

// export default client;