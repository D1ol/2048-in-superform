import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.REDIS_URL || "",
  token: process.env.REDIS_TOKEN || ""
});

export default async (req: NextApiRequest, res: NextApiResponse) => {


  try {
    const keys = await redis.keys("game:*");

    if (!keys.length) {
      return res.status(200).json([]);
    }

    const pipeline = redis.pipeline();
    keys.forEach((key) => pipeline.hgetall(key));
    const allData = await pipeline.exec();

    const filteredData = allData
      .map((data, index) => ({ key: keys[index], ...data }))
      .filter((game) => game.win);

    const bestGames = {};

    for (const game of filteredData) {
      const { name, score, time } = game;
      const scoreNum = parseInt(score, 10) || 0;
      const timeNum = parseInt(time, 10) || 0;

      if (!bestGames[name] || timeNum < bestGames[name].time ||
        (timeNum === bestGames[name].time && scoreNum > bestGames[name].score)) {
        bestGames[name] = game;
      }
    }

    const result = Object.values(bestGames);

    if (req.method === "GET") {
      return res.status(200).json(result);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Fetch error" });
  }
};
