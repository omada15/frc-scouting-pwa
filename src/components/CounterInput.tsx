import React from "react";

interface CounterInputProps {
    value?: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number;
    label?: string;
}

const CounterInput: React.FC<CounterInputProps> = ({
    value = 0,
    onChange,
    min = 0,
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

    let boxLabel = null;
    if (label != null) {
        boxLabel = (
            <h3 className="font-semibold text-white text-2xl pb-1">{label}</h3>
        );
    }

    return (
        <div className="flex flex-col items-center space-y-2">
            {boxLabel}
            <div className="flex flex-row items-center space-x-2 ">
                <button
                    onClick={decrement}
                    className="bg-sky-600 text-white font-semibold text-xl px-3 py-1 rounded-full hover:bg-sky-700 transition-colors h-12.5 w-12.5"
                >
                    −
                </button>
                <p className="text-white font-bold text-5xl px-3">{value}</p>
                <button
                    onClick={increment}
                    className="bg-sky-600 text-white font-semibold text-xl px-3 py-1 rounded-full hover:bg-sky-700 transition-colors h-12.5 w-12.5"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CounterInput;
