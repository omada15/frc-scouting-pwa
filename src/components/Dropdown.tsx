import React from "react";

interface DropdownProps {
    value: string;
    options: string[];
    label?: string;
    placeholder?: string;
    onChange: (newValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    value,
    options,
    label,
    onChange,
    placeholder = "Select an option",
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
            <div className="flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-gray-700 text-white w-50 max-h-15 py-5 rounded-full font-semibold focus:outline-none"
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Dropdown;
