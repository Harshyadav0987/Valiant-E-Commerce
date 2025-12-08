import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("connect", () => console.log("🟢 Redis connected"));
client.on("error", (err) => console.error("🔴 Redis error:", err));

await client.connect();

export default client;
