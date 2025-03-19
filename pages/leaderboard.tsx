import React, { useEffect, useState } from "react";
import LeaderboardTable from "@/components/leaderboard";
import styles from "@/styles/index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {LeaderboardType} from "@/pages/api/leaderboard"

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const { type } = router.query;
  const leaderboardType = type || LeaderboardType.Win;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch("/api/leaderboard?type=" + leaderboardType);
      const leaderboardData = await response.json();
      setData(leaderboardData);
    };

    fetchLeaderboard();
  }, [leaderboardType]);

  return (
    <div className={styles.leaderboard}>
      <header>
        <h1>Leaderboard</h1>
        <Link href="/">
          <button className={styles.backButton}>Back</button>
        </Link>
      </header>
      <main>
        <LeaderboardTable data={data} type={leaderboardType as string} />
      </main>
    </div>
  );
};

export default Leaderboard;
