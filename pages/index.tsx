import Head from "next/head";
import Board from "@/components/board";
import Score from "@/components/score";
import Timer from "@/components/timer";
import SaveForm from "@/components/saveForm";
import styles from "@/styles/index.module.css";
import { GameContext } from "@/context/game-context";
import { useContext } from "react";
import { useState } from "react";


export default function Home() {
  const score = useContext(GameContext);
  const [formattedTime, setFormattedTime] = useState("00:00");

  return (
    <div className={styles.twenty48}>
      <Head>
        <title>Play 2048</title>
        <meta
          name="description"
          content="Fully-functional 2048 game built in NextJS and TypeScript. Including animations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon16.png" />
      </Head>
      <header>
        <h1>2048</h1>
        <Score />
      </header>
      <main>
        <Board />
      </main>
      <div>
        <Timer setFormattedTime={setFormattedTime} />
      </div>
      <div>
        <SaveForm score={score.score} time={formattedTime} />
      </div>
      <footer>
        <div className={styles.socials}>
        </div>
        <div>Forked and customized with ❤️ by D1ol only for Superform Community</div>
      </footer>
    </div>
  );
}
