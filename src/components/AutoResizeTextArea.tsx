import React, { useRef, useState } from "react";

const AutoResizeTextarea: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        target.style.height = "auto"; // reset height
        target.style.height = target.scrollHeight + "px"; // grow to fit content
        setValue(target.value);
    };

    return (
        <div className="bg-gray-700 w-77.5 py-1 rounded-3xl flex justify-center pr-2.5">
            <textarea
                ref={textareaRef}
                value={value}
                onInput={handleInput}
                placeholder={placeholder}
                className="bg-gray-700 text-white placeholder:text-gray-400 rouned-3xl focus:outline-none max-h-22.5 w-70 px-5 py-3 resize-none overflow-auto custom-scrollbar"
            />
        </div>
    );
};

export default AutoResizeTextarea;