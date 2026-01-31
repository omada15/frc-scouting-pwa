import React from "react";

interface IntegerInputProps {
    value: number; // current value
    onChange: (newValue: number) => void; // callback
    placeholder?: string;
    min?: number;
    max?: number;
    label?: string;
}

const IntegerInput: React.FC<IntegerInputProps> = ({
    value,
    onChange,
    placeholder,
    min,
    max,
    label,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        // Only allow digits or empty string
        if (!/^\d*$/.test(raw)) return;
        // Parse number or null if empty
        let newValue = raw === "" ? 0 : parseInt(raw, 10);
        // Respect min/max if number
        if (newValue !== 0) {
            if (min !== undefined && newValue < min) newValue = min;
            if (max !== undefined && newValue > max) newValue = max;
        }

        onChange(newValue);
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
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={value !== null ? value : ""}
                placeholder={placeholder}
                onChange={handleChange}
                className="bg-gray-600 h-15 w-60 text-white text-4xl font-semibold rounded-full px-5 text-center"
            />
        </div>
    );
};

export default IntegerInput;
