import { useState } from "react";
import styles from "@/styles/saveForm.module.css";

interface NameInputProps {
  score: number;
  time: string;
}

const NameInput: React.FC<NameInputProps> = ({ score, time }) => {
  const [name, setName] = useState<string>(""); // Состояние для имени
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
  const [error, setError] = useState<string>(""); // Ошибка, если есть

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };


  const handleSubmit = async () => {
    const key = `game:${Date.now()}`;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, name, score, time }),
      });

      if (response.ok) {
        alert("Score saved successfully!");
        setName(""); // Очищаем поле
      } else {
        throw new Error("Failed to save score");
      }
    } catch (error) {
      setError("Error saving score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Enter your name to save your score</h3>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        className={styles.inputName}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit} className={styles.button} disabled={loading}>
        {loading ? "Saving..." : "Save Score"}
      </button>
    </div>
  );
};

export default NameInput;
