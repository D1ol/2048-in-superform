import React from "react";
import styles from "@/styles/gameSelector.module.css";

const games = [
  {
    id: "2048",
    name: "2048 Superform",
    route: "https://superform2048.vercel.app/"
  },
  {
    id: "safari",
    name: "Safari game",
    route: "https://superformsafari.v0.build/"
  },
  {
    id: "launcher",
    name: "GameLauncher",
    route: "https://noctis-requiem.itch.io/superform-games"
  },
  {
    id: "flappy",
    name: "Flappy piggy",
    route: "https://noctis-requiem.itch.io/flappy-piggy"
  },
  {
    id: "stars",
    name: "Piggy to the Stars",
    route: "https://noctis-requiem.itch.io/piggy-to-the-stars"
  },
  {
    id: "piggyman",
    name: "PiggyMan",
    route: "https://crucialfox.itch.io/piggy-man"
  }
];

const GameSelector: React.FC = () => {

  const handleSelectGame = (route: string) => {
    window.open(route, "_blank");
  };

  return (
    <div className={styles.navContainer}>
      <h3 className={styles.title}>Our games:</h3>
      <div className={styles.menu}>
        {games.map((game) => (
          <button
            key={game.id}
            className={styles.navButton}
            onClick={() => handleSelectGame(game.route)}
          >
            {game.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSelector;
