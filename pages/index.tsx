import Head from "next/head";
import Board from "@/components/board";
import Score from "@/components/score";
import Timer from "@/components/timer";
import SaveForm from "@/components/saveForm";
import DropdownMenu from "@/components/dropdown";
import styles from "@/styles/index.module.css";
import { useRouter } from "next/router";
import Socials from "@/components/socials";
import GameSelector from "@/components/gameSelector";
import ScoreTimer from "@/components/scoreTimer";


export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.twenty48}>
      <Head>
        <title>Play 2048</title>
        <meta name="description" content="Friendly 2048 Superform theme game" />
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
      <div className={styles.buttonContainer}>
        <button
          className={styles.leaderboardButton}
          onClick={() => router.push("/leaderboard")}
        >
          🏆 Win Leaderboard
        </button>
        <button
          className={styles.leaderboardButton}
          onClick={() => router.push("/leaderboard?type=score")}
        >
          🏆 Score Leaderboard
        </button>
      </div>
      <header>
        <h1>2048</h1>
        <ScoreTimer />
      </header>
      <main>
        <Board />
      </main>
      <div>
        <DropdownMenu />
      </div>
      <div>
        <SaveForm />
        <GameSelector />
      </div>
      <footer>
        <Socials />
      </footer>
    </div>
  );
}
