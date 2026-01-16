import React, { useState } from "react";

let json =
  '{"Intake issues": false,"Climb Failed": false,"Robot unresponsive": false,"Robot part fell off": false,"Did not participate": false,"Auto Stop": false,"Robot could not get off after climb": false,"Other": false}';
let jsonObject = JSON.parse(json);

interface DropdownProps {
  value: string;
  options: string[];
  label?: string;
}

<<<<<<< HEAD
function changeJson(value: string, option: string) {
  if (jsonObject[option] === false) {
    jsonObject[option] = true;
  } else {
    jsonObject[option] = false;
  }

  console.log(jsonObject);
  return jsonObject;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value }) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  let boxLabel = null;
  if (label != null) {
    boxLabel = (
      <h3 className="font-semibold text-white text-2xl pb-1">{label}</h3>
=======
const Dropdown: React.FC<DropdownProps> = ({ label, options }) => {
    const [showCheckboxes, setShowCheckboxes] = useState(false);

    return (
        /* Use w-full and px-4 to ensure it doesn't touch the very edges of mobile screens */
        <div className="flex flex-col items-center space-y-2 w-full px-4">
            {label && (
                <h3 className="font-semibold text-white text-xl md:text-2xl pb-1 text-center">
                    {label}
                </h3>
            )}

            <div
                onClick={() => setShowCheckboxes(!showCheckboxes)}
                /* Changed w-60 to w-full max-w-[15rem] so it shrinks if needed */
                className="cursor-pointer text-white text-base p-4 flex flex-col items-start justify-center w-full max-w-[15rem] bg-gray-700 rounded-full focus-within:outline-auto relative select-none"
            >
                <div className="text-center w-full">Select Options</div>
            </div>

            {/* Added rounded corners and responsive width to the dropdown panel */}
            <div
                style={{ display: showCheckboxes ? "block" : "none" }}
                className="bg-gray-700 p-4 border border-gray-600 rounded-lg w-full max-w-[15rem] shadow-xl"
            >
                {options.map((option, index) => (
                    <div
                        key={index}
                        className="flex items-center mb-2 last:mb-0"
                    >
                        <label className="text-white flex items-center cursor-pointer space-x-2">
                            <input
                                type="checkbox"
                                className="rounded text-blue-500"
                            />
                            <span className="truncate">{option}</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
>>>>>>> 519e10025faad1a46056533400818e548da945fd
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {boxLabel}

      <div
        onClick={() => setShowCheckboxes((showCheckboxes) => !showCheckboxes)}
        className="cursor-pointer text-white text-l pl-8 pr-8 p-4 flex-col items-start flex justify-center w-60 bg-gray-700 rounded-full focus-within:outline-auto relative"
      >
        <div className="relative">Select Options</div>
      </div>
      <div
        style={{ display: showCheckboxes ? "block" : "none" }}
        className="bg-gray-700 p-4 border-gray-200"
      >
        {options.map((option) => (
          <>
            <label className="text-white ">
              <input
                type="checkbox"
                onClick={(e) =>
                  (value = changeJson(
                    (e.target as HTMLInputElement).value,
                    option
                  ))
                }
              />{" "}
              {option}
            </label>
            <br></br>
          </>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
