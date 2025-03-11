import { useContext } from "react";
import { GameContext } from "@/context/game-context";
import styles from "@/styles/scoreTimer.module.css";

export default function ScoreTimer() {
  const { score, time } = useContext(GameContext);

  return (
    <div className={styles.container}>
      <div className={styles.score}>
        <span>Score</span>
        <div>{score}</div>
      </div>
      <div className={styles.timer}>
        <span>Time</span>
        <div>{formatTime(time)}</div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
