import React, { useState } from "react";
import { rt } from "../scripts/firebase";

interface NestedEpochData {
    [key: string]: { time: number };
}

interface DiffsJson {
    [key: string]: boolean;
}

const Online: React.FC = () => {
    const [data, setData] = useState<NestedEpochData | null>(null);
    const [diffs, setDiffs] = useState<DiffsJson>({});

    const proces = (inputData: NestedEpochData): DiffsJson => {
        const currentEpoch = Math.floor(Date.now() / 1000);

        return Object.entries(inputData).reduce((acc, [key, val]) => {
            acc[key] = (currentEpoch - val.time)<10;
            return (acc);
        }, {} as DiffsJson);
    };

    const buttonStyle: string =
        "bg-sky-600 text-white font-semibold text-xl px-2 py-2 rounded-full hover:bg-sky-700 transition-colors h-15 w-35 mr-2";

    return (
        <div className="p-10">
            <h2 className="font-bold text-white text-l pb-1">click right side or bottom button twice. "true" means user detected in last 10 seconds</h2>
            <button
                onClick={() => {
                    window.location.href = "/";
                }}
                className={buttonStyle}
            >
                Back
            </button>
            {/* BUTTON 1: Fetching Async Data */}
            <button
                className={buttonStyle}
                onClick={async () => {
                    const result = await rt("online");
                    setData(result);
                    if (data) {
                        const calculated = proces(data);
                        setDiffs(calculated);
                    }
                }}
            >
                Fetch data
            </button>

            <div className="mt-5">
                <h2 className="font-bold text-white text-l pb-1">Results:</h2>
                <pre className="bg-gray-100 p-4 rounded">
                    {JSON.stringify(diffs, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default Online;
