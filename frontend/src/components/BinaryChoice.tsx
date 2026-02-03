import React from "react";

interface BinaryChoiceProps {
    label?: string; // Label for the choice
    options: [string, string]; // Two options
    value?: boolean | null;
    onChange: (newValue: boolean) => void;
}

const BinaryChoice: React.FC<BinaryChoiceProps> = ({
    label,
    options,
    value,
    onChange,
}) => {
    let boxLabel = null;
    if (label != null) {
        boxLabel = (
            <h3 className="font-semibold text-white text-2xl pb-1">{label}</h3>
        );
    }

    return (
        <div className="flex flex-col items-center space-y-2">
            {boxLabel}
            <div className="flex flex-row items-center space-x-4">
                <button
                    onClick={() => onChange(true)}
                    className={`px-6 py-3 rounded-full text-xl font-semibold transition-colors duration-200 ${
                        value
                            ? "bg-sky-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                >
                    {options[0]}
                </button>
                <button
                    onClick={() => onChange(false)}
                    className={`px-6 py-3 rounded-full text-xl font-semibold transition-colors duration-200 ${
                        !value && value !== null
                            ? "bg-sky-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                >
                    {options[1]}
                </button>
            </div>
        </div>
    );
};

export default BinaryChoice;
