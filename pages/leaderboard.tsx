import React, { useEffect, useState } from 'react';
import LeaderboardTable from '@/components/leaderboard';
import styles from "@/styles/index.module.css";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch('/api/leaderboard');
      const leaderboardData = await response.json();
      setData(leaderboardData);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.leaderboard}>
      <header>
        <h1>Leaderboard</h1>
      </header>
      <main>
        <LeaderboardTable data={data} />
      </main>
    </div>
);
};

export default Leaderboard;
