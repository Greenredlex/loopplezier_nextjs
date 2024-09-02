import React, { useState } from "react";
import { useResponse } from "@/context/ResponseContext";
import { Scores } from "@/types/types";
import NumberInputForm from "./NumberInputForm";

function ScoreForm() {
  const [inputScores, setInputScores] = useState<Scores>({
    "Score openbare verlichting": 0,
    "Score bomen": 0,
    "Score water": 0,
    "Score monumenten": 0,
    "Score drukke wegen": 0,
    "Score parken": 0,
    "Start knooppunt": 1399,
    "Eind knooppunt": 1346,
    "Minimale afstand": 200,
    "Maximale afstand": 1000,
  });
  const { setResponse } = useResponse();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputScores((prevScores) => ({
      ...prevScores,
      [name]: Number(value),
    }));
  };

  const handleIncrement = (name: keyof Scores) => {
    setInputScores((prevScores) => ({
      ...prevScores,
      [name]: prevScores[name] + 1,
    }));
  };

  const handleDecrement = (name: keyof Scores) => {
    setInputScores((prevScores) => ({
      ...prevScores,
      [name]: prevScores[name] - 1,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/data?endpoint=score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scores: inputScores }),
    });

    const responseData = await response.json();

    setResponse(responseData);
  };

  return (
    <div className="px-6 py-10 text-white bg-[#262730] w-screen sm:w-80">
      <h1 className="text-lg mb-4">Map Settings</h1>
      <form
        className="p-4 border border-[#44454d] rounded-lg text-sm"
        onSubmit={handleSubmit}
      >
        {(
          [
            "Score openbare verlichting",
            "Score bomen",
            "Score water",
            "Score monumenten",
            "Score drukke wegen",
            "Score parken",
            "Start knooppunt",
            "Eind knooppunt",
            "Minimale afstand",
            "Maximale afstand",
          ] as (keyof Scores)[]
        ).map((score) => (
          <NumberInputForm
            key={score}
            score={score}
            value={inputScores[score]}
            onChange={handleChange}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))}

        <button
          className="p-2 mt-4 rounded-lg border hover:border-red-500 hover:text-red-500"
          type="submit"
        >
          Calculate
        </button>
      </form>
    </div>
  );
}

export default ScoreForm;
