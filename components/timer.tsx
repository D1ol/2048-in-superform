import { useState, useEffect } from "react";

function Timer({ setFormattedTime }: { setFormattedTime: (time: string) => void }) {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    setFormattedTime(formatTime(timeElapsed));
  }, [timeElapsed, setFormattedTime]);

  return (

    <div style={{ fontSize: "20px", fontWeight: "bold", margin: "10px" }}>
      🚀 Played time: {formatTime(timeElapsed)}
    </div>
  );
}

export default Timer;
