import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useReducer, useEffect
} from "react";
import styles from "@/styles/saveForm.module.css";
import { GameContext } from "@/context/game-context";
import statusReducer, { initialState } from "@/reducers/status-reducer";
import sha256 from 'crypto-js/sha256';
import base64 from 'crypto-js/enc-base64'


interface NameInputProps {
}

const SaveForm: React.FC<NameInputProps> = (props) => {
  const { score, status, time } = useContext(GameContext);

  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [statusState, dispatch] = useReducer(statusReducer, initialState);

  // Используем useRef для хранения данных контекста
  const scoreRef = useRef(score);
  const statusRef = useRef(status);
  const timeRef = useRef(time);

  // Обновляем ref при изменении контекста
  useEffect(() => {
    scoreRef.current = score;
    statusRef.current = status;
    timeRef.current = time;
  }, [score, status, time]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch({
        type: "change_subscribe",
        status: localStorage.getItem("subscribed") === "true",
      });
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = useCallback(async () => {
    const apiSalt = Number(process.env.NEXT_PUBLIC_API_SALT);
    const jsonString = JSON.stringify({
      name,
      score: scoreRef.current,
      status: statusRef.current,
      time: timeRef.current
    });
    const generatedSalt = sha256(jsonString + apiSalt).toString(base64);

    if (!statusState.subscribed) {
      window.open("https://x.com/diol4ik", "_blank");
      dispatch({ type: "change_subscribe", status: true });
      localStorage.setItem("subscribed", JSON.stringify(true));
      return;
    }

    if (loading) return;

    if (!name.trim()) {
      setError("Provide your name pls");
      return;
    }

    if (scoreRef.current < 2) {
      setError("Try to play better");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score: scoreRef.current, status: statusRef.current, time: timeRef.current, generatedSalt }),
      });

      if (response.ok) {
        alert("Score saved successfully!");
        setName("");
      } else {
        throw new Error("Failed to save score");
      }
    } catch (error) {
      setError("Error saving score");
    } finally {
      setLoading(false);
    }
  }, [statusState.subscribed, loading, name]);

  return (
    <div>
      <h3>Enter your name to save your score</h3>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        className={styles.inputName}
        required={true}
      />
      <button
        onClick={handleSubmit}
        className={styles.button}
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : statusState.subscribed
            ? "Save score"
            : "Follow on X"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SaveForm;
