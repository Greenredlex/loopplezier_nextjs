import { useState } from "react";

function ScoreForm() {
  const [score, setScore] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = {
      score: score,
    };

    const response = await fetch("/api/data?endpoint=score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    console.log("Score Form frontend:", responseData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="score">Score:</label>
      <input
        type="text"
        id="score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        required
      />
      <button type="submit">Submit Score</button>
    </form>
  );
}

export default ScoreForm;
