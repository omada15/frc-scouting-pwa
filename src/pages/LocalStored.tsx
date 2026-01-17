import React from "react";
import { useNavigate } from "react-router-dom";
import { writeData } from "../scripts/firebase";
import ReactJsonView from '@microlink/react-json-view'

interface ActionComponentProps {
    onSubmit: () => void;
    onDelete: () => void;
}

const ActionComponent: React.FC<ActionComponentProps> = ({
    onSubmit,
    onDelete,
}) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/");
    };
    
    return (
        <div className="flex flex-row justify-center items-center space-x-32 pt-6">
            <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-2xl shadow"
                onClick={onSubmit}
            >
                Submit
            </button>

            <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-2xl shadow"
                onClick={onDelete}
            >
                Delete
            </button>
            <button
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-2xl shadow"
                onClick={goBack}
            >
                Back
            </button>
        </div>
    );
};

const LocalStorageView: React.FC = () => {
    const [show, setShow] = React.useState<boolean>(true);
    const [keys, setKeys] = React.useState<string[]>([]);
    const [selectedKey, setSelectedKey] = React.useState<string>("");
    const [value, setValue] = React.useState<string>("");

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setKeys(Object.keys(localStorage));
        }
    }, []);

    const loadItem = () => {
        if (!selectedKey) return;
        const v = localStorage.getItem(selectedKey);
        setValue(v ?? "");
    };

    const deleteItem = () => {
        if (!selectedKey) return;
        localStorage.removeItem(selectedKey);
        setValue("");
        setKeys(Object.keys(localStorage));
    };

    const submitItem = () => {
        if (!selectedKey) return;
        let json = JSON.parse(value);
        writeData(
            `${json.teamNumber?.toString()}/${json.matchNumber?.toString()}`,
            json
        );
    };
    const makeValue = (val: string) => {
        let parsed = JSON.parse(val);
        return (
            "Team Number: " +
            parsed.teamNumber +
            "\nMatch Number: " +
            parsed.matchNumber +
            "\n"
        );
    };

    return (
        <div className="flex flex-col items-center justify-start space-y-6 pt-12">
            <h1 className="font-bold text-white text-4xl">
                LocalStorage Viewer{" "}
            </h1>
            <p className="font-bold text-white">
                scoutData-(teamNumber)-(matchNumber)
            </p>
            <div className="flex flex-col items-center space-y-4 pb-8">
                <h2 className="text-white text-xl">
                    Select a key to view/edit
                </h2>

                <select
                    className="bg-gray-800 text-white px-4 py-2 rounded-xl"
                    value={selectedKey}
                    onChange={(e) => setSelectedKey(e.target.value)}
                >
                    <option value="">-- Select Key --</option>
                    {keys.map((k) => (
                        <option key={k} value={k}>
                            {k}
                        </option>
                    ))}
                </select>

                <button
                    onClick={loadItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                >
                    Load from localStorage
                </button>

                {show ? (
                    <ReactJsonView
                        src={(() => {
                            try {
                                return JSON.parse(value) || {};
                            } catch (e) {
                                return {};
                            }
                        })()}
                        theme={"monokai"}
                    />
                ) : null}
                <p className="text-white">
                    Make sure the textbox above has a value before submitting or
                    deleting
                </p>
            </div>

            <ActionComponent onSubmit={submitItem} onDelete={deleteItem} />
        </div>
    );
};

export default LocalStorageView;
