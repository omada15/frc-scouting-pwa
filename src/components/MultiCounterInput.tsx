import React from "react";
import IntegerInput from "./IntegerInput";

interface MultiCounterInputProps {
  value?: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

const MultiCounterInput: React.FC<MultiCounterInputProps> = ({
  value = 0,
  onChange,
  min = -1,
  max = Infinity,
  label,
}) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const incfive = () => {
    if (value < max - 5) {
      onChange(value + 5);
    } else {
      onChange(max);
    }
  };

  const decfive = () => {
    if (value > min + 5) {
      onChange(value - 5);
    } else {
      onChange(0);
    }
  };

  const decten = () => {
    if (value > min + 10) {
      onChange(value - 10);
    } else {
      onChange(0);
    }
  };

  const incten = () => {
    if (value < max - 10) {
      onChange(value + 10);
    } else {
      onChange(max);
    }
  };

  let boxLabel = null;
  if (label != null) {
    boxLabel = (
      <h3 className="font-semibold text-white text-2xl pb-1">{label}</h3>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2 h-auto">
      {boxLabel}
      <div className="flex 2xl:flex-row xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col 2xs:flex-col items-center space-x-2">
        <button
          onClick={decten}
          className="bg-sky-600 text-white font-semibold text-xl px-3 my-1 rounded-full hover:bg-sky-700 transition-colors h-12.5 w-12.5"
        >
          -10
        </button>
        <button
          onClick={decfive}
          className="bg-sky-600 text-white font-semibold text-xl px-2 my-1 rounded-full hover:bg-sky-700 transition-colors h-12.5 w-12.5"
        >
          -5
        </button>
        <button
          onClick={decrement}
          className="bg-sky-600 text-white font-semibold text-xl px-3 my-1 rounded-full hover:bg-sky-700 transition-colors h-12.5 w-12.5"
        >
          -1
        </button>
        <IntegerInput
          min={0}
          max={max}
          label={""}
          placeholder={"hello :)"}
          onChange={onChange}
          value={value || 0}
        />
        <button
          onClick={increment}
          className="bg-sky-600 text-white font-semibold text-xl px-3 my-1 rounded-full hover:bg-sky-700 transition-colors h-12.5 w-12.5"
        >
          +1
        </button>
        <button
          onClick={incfive}
          className="bg-sky-600 text-white font-semibold text-xl px-2 my-1 rounded-full hover:bg-sky-700 transition-colors h-12.5 w-12.5"
        >
          +5
        </button>
        <button
          onClick={incten}
          className="bg-sky-600 text-white font-semibold text-xl px-1 my-1 rounded-full hover:bg-sky-700 transition-colors h-12.5 w-12.5"
        >
          +10
        </button>
      </div>
    </div>
  );
};

export default MultiCounterInput;
