import React, { useRef } from "react";

interface Props {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const AutoResizeTextarea: React.FC<Props> = ({
    label,
    value,
    onChange,
    placeholder,
}) => {
    let boxLabel = null;
    if (label != null) {
        boxLabel = (
            <h3 className="font-semibold text-white text-2xl pb-5">{label}</h3>
        );
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        target.style.height = "auto";
        target.style.height = target.scrollHeight + "px";

        onChange(target.value); // ✅ pass value to parent
    };

    return (
        <div className="justify-items-center">
            {boxLabel}
            <div className="bg-gray-700 w-60 py-1 rounded-3xl flex justify-center pr-2.5">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onInput={handleInput}
                    placeholder={placeholder}
                    className="bg-gray-700 text-white placeholder:text-gray-400 rounded-3xl focus:outline-none max-h-22.5 w-70 px-5 py-3 resize-none overflow-auto custom-scrollbar"
                />
            </div>
        </div>
    );
};

export default AutoResizeTextarea;
