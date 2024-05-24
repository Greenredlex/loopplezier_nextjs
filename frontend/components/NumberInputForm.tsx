import React from "react";
import { Scores } from "@/types/types";

interface NumberInputFormProps {
  score: keyof Scores;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrement: (name: keyof Scores) => void;
  onDecrement: (name: keyof Scores) => void;
}

const NumberInputForm: React.FC<NumberInputFormProps> = ({
  score,
  value,
  onChange,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex flex-col mb-4" key={score}>
      <label className="mb-2">{score}</label>
      <div className="flex justify-between rounded-lg bg-[#0e1117]">
        <input
          type="number"
          name={score}
          value={value ?? ""}
          onChange={onChange}
          className="py-2.5 pl-2 text-white bg-[#0e1117] focus:outline-none rounded-l-lg"
        />
        <div className="flex">
          <button
            type="button"
            onClick={() => onDecrement(score)}
            className="flex items-center justify-center py-1 px-3 text-lg text-white hover:bg-red-500"
          >
            <p className="mb-0.5">-</p>
          </button>
          <button
            type="button"
            onClick={() => onIncrement(score)}
            className="flex items-center justify-center py-1 px-3 text-lg text-white hover:bg-red-500 rounded-r-lg"
          >
            <p className="mb-0.5">+</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInputForm;
