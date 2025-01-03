import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.REDIS_URL || "",
  token: process.env.REDIS_TOKEN || "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { key, name, score, time } = req.body;

      if (typeof score !== "number" || typeof time !== "string" || typeof name !== 'string' ) {
        return res.status(400).json({ error: "Invalid data format" });
      }

      const keyHash = `game:${Date.now()}`;

      await redis.hset(keyHash, {
        "key": key,
        "name": name,
        "score": score,
        "time": time
      });

      return res.status(200).json({ message: "Score saved successfully!" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
