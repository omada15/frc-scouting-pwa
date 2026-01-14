import React, { useState } from "react";

interface DropdownProps {
  value: string;
  options: string[];
  label?: string;
  placeholder?: string;
  onChange: (newValue: string) => void;
}

const [showCheckboxes, setShowCheckboxes] = useState(false);

const Dropdown: React.FC<DropdownProps> = ({ label }) => {
  let boxLabel = null;
  if (label != null) {
    boxLabel = (
      <h3 className="font-semibold text-white text-2xl pb-1">{label}</h3>
    );
  }

  /*<button >asd</button>*/
  return (
    <div className="flex flex-col items-center space-y-2">
      {boxLabel}

      <div className="flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative">
        <div className="relative">
          <select
            onClick={() =>
              setShowCheckboxes((showCheckboxes) => !showCheckboxes)
            }
          >
            <option>Select Options</option>
          </select>
          <div className="absolute left-0px right-0px top-0px bottom-0px" />
        </div>
        <div style={{ display: showCheckboxes ? "block" : "none" }}>
          <label>
            <input type="checkbox" /> Option 1
          </label>
          <label>
            <input type="checkbox" /> Option 2
          </label>
          <label>
            <input type="checkbox" /> Option 3
          </label>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
