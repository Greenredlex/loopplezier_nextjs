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
    <div className="px-6 py-10 text-white bg-[#262730]">
      <h1 className="text-lg mb-4">Map Settings</h1>
      <form
        className="p-4 border border-[#44454d] rounded-lg text-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label className="mb-2">Score</label>
          <div className="flex justify-between rounded-lg bg-[#0e1117]">
            <input
              type="number"
              value={inputScore ?? ""}
              onChange={(e) => setInputScore(Number(e.target.value))}
              className="py-2.5 pl-2 text-white bg-[#0e1117] focus:outline-none rounded-l-lg"
            />
            <div className="flex">
              <button
                type="button"
                onClick={() =>
                  setInputScore((prev) => (prev !== null ? prev - 1 : 0))
                }
                className="flex items-center justify-center py-1 px-3 text-lg text-white hover:bg-red-500"
              >
                <p className="mb-0.5">-</p>
              </button>
              <button
                type="button"
                onClick={() =>
                  setInputScore((prev) => (prev !== null ? prev + 1 : 1))
                }
                className="flex items-center justify-center py-1 px-3 text-lg text-white hover:bg-red-500 rounded-r-lg"
              >
                <p className="mb-0.5">+</p>
              </button>
            </div>
          </div>
        </div>
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
