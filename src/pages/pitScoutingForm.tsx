import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IntegerInput from "../components/IntegerInput";
import AutoResizeTextarea from "../components/AutoResizeTextArea";








const PitScoutingForm: React.FC = () => {
    function goBack() {
        const navigate = useNavigate();
        navigate("/");
    }

    const [teamnum, setTeamnum] = useState(0);
    const [chassisSize1, setChassisSize1] = useState(0);
    const [chassisSize2, setChassisSize2] = useState(0);
    const [startingHeight, setStartingHeight] = useState<string>("");
    const [maxHeight, setMaxHeight] = useState<string>("");
    const [motorTypes, setMotorTypes] = useState<string>("");
    const [outpost, setOutpost] = useState<boolean>(false);

    const buttonStyle =
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    return (
        <div className="overflow-x-auto flex flex-col items-center justify-start space-y-6 pt-12.5">
            <h1 className="text-4xl font-bold text-white">Pit Scouting Form</h1>
            <button className={buttonStyle} onClick={goBack}>
                Back
            </button>
            <IntegerInput
                value={teamnum}
                onChange={setTeamnum}
                label={"Team Number"}
            />
            <IntegerInput
                value={chassisSize1}
                onChange={setChassisSize1}
                label="Chassis size char 1"
            />
            <IntegerInput
                value={chassisSize2}
                onChange={setChassisSize2}
                label="Chassis size char 2"
            />
            <h1 className="text-white text-2xl font-semibold">
                chassis {chassisSize1}x{chassisSize2}
            </h1>
            <AutoResizeTextarea
                value={startingHeight}
                onChange={(val) => setStartingHeight(val.toString())}
                label="Starting Height (inches)"
            />
            <AutoResizeTextarea
                value={maxHeight}
                onChange={(val) => setMaxHeight(val.toString())}
                label="Max Height (inches)"
            />
        </div>
    );
};

export default PitScoutingForm;