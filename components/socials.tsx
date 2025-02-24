import styles from "@/styles/socials.module.css";
import Image from "next/image";

export default function Socials() {

  return (
    <div className={styles.socials}>
        <h4>Forked and customized with ❤️ by D1ol</h4>
      <div className={styles.logos}>
        <a href="https://x.com/diol4ik" target="_blank" rel="noopener">
          <Image
            src="social-x.svg"
            alt="D1ol on X"
            width={32}
            height={32}
          />
        </a>
        <a href="https://diol4ik.t.me/" target="_blank" rel="noopener">
          <Image
            src="social-telegram.svg"
            alt="D1ol on Telegram"
            width={32}
            height={32}
          />
        </a>
      </div>
    </div>
  );

}
