import { useState } from "react";
import { useScore } from "@/context/ScoreContext";

function ScoreForm() {
  const [inputScore, setInputScore] = useState<number | null>(null);
  const { setScore } = useScore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/data?endpoint=score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score: inputScore }),
    });

    const responseData = await response.json();

    setScore(responseData.score);

    console.log("ScoreForm:", responseData.score);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Score:
        <input
          type="number"
          value={inputScore ?? ""}
          onChange={(e) => setInputScore(Number(e.target.value))}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ScoreForm;
