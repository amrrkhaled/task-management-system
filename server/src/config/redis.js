import Redis from "ioredis";


const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6399,
  password: process.env.REDIS_PASSWORD || null,
});

redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (err) => console.error("Redis error:", err));

export default redisClient;
