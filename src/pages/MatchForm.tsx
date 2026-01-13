import React, { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import CounterInput from "../components/CounterInput";
import BinaryChoice from "../components/BinaryChoice";
import NumericInput from "../components/IntegerInput";
import IntegerInput from "../components/IntegerInput";
import Dropdown from "../components/Dropdown";
import AutoResizeTextarea from "../components/AutoResizeTextArea";
import { writeData } from "../scripts/firebase";
import { readCookie } from "../scripts/user";

const MatchForm: React.FC = () => {
    
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/");
    };
    
    useEffect(() => { // useEffect to run after component mounts
        if (readCookie("user") == undefined) {
            navigate("/login");
        }
    }, []) // empty dependency array so only runs once
    const [section, setSection] = useState<"setup" | "auto" | "teleop" | "endgame">("setup");

    // this boolean is used to show a message if the data was not sent
    const [sent, setSent] = useState<boolean>(true);
    // Setup values
    const [eventName, setEventName] = useState<string>("");
    const [teamNumber, setTeamNumber] = useState<number | null>(null);
    const [matchNumber, setMatchNumber] = useState<number | null>(null);

    // Auto values
    

    // Teleop values
    

    // Endgame values
    const [endgameAction, setEndgameAction] = useState<string>("");
    const [hadError, setHadError] = useState<boolean | null>(null);
    const [robotError, setRobotError] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    const events = [
        "example 1",
        "example 2",
        "example 3"
    ];

    const endgameActions = [ // add 
        "None",
        "Parked",
        "Shallow Climb",
        "Deep Climb"
    ];

    const robotErrors = [
        "example error 1",
        "example error 2",
        "example error 3"
    ];

    function changeError(newValue: boolean) {
        setHadError(newValue);
        if (!hadError && (robotError != "")) {
            setRobotError("");
        }
    }
    async function submitData() {
        //make sure certain fields are filled out
        let debug = true;
        let check: boolean = (eventName !== "" && teamNumber !== null && matchNumber !== null && passedStartingLine !== null && playedDefense !== null && hadError !== null && endgameAction !== "");
        const data = { // sample data object, 
            name: readCookie("user"),
            eventName: eventName,
            teamNumber: teamNumber,
            matchNumber: matchNumber,
            // add your variables in a similar style

            endgameAction: endgameAction,
            hadError: hadError,
            robotError: robotError
        };
        /*
        The path for block of data will be submitted as follows:
        /{eventName}/{teamNumber}/{matchNumber}/{timestamp}, timestamp is not finished
        */

        if (!check && !debug) {
            alert("Please fill out all required fields before submitting.");
        } else {
            localStorage.setItem(`scoutData-${teamNumber}-${matchNumber}`, JSON.stringify(data));
            setSent(false)
            if (!await writeData(`${teamNumber?.toString()}/${matchNumber?.toString()}`, data)) {
                setSent(true);
            } else {
                setSent(false);
            }
            const pathname = window.location.pathname;
            if (pathname === "/match") {
                goBack();
            }
        }
    }

    const tab = (name: string) =>
        `px-5 py-2 rounded-full font-semibold transition-colors ${section === name ? "bg-sky-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`;

    let content = null;


    const buttonStyle: string = "bg-sky-600 text-white font-semibold text-xl px-2 py-2 rounded-full hover:bg-sky-700 transition-colors h-15 w-35";

    /*
    content = (
            <>
                <BinaryChoice label={"Crossed Starting Line?"} options={["Yes", "No"]} button1Selected={passedStartingLine} onChange={setPassedStartingLine} />
                <div className="flex flex-row items-center space-x-15">
                    <div className="flex flex-col space-y-5">
                        <CounterInput label={"Auto L4 Coral"} max={12} value={autoL4Coral} onChange={setAutoL4Coral} />
                        <CounterInput label={"Auto L3 Coral"} max={12} value={autoL3Coral} onChange={setAutoL3Coral} />
                        <CounterInput label={"Auto L2 Coral"} max={12} value={autoL2Coral} onChange={setAutoL2Coral} />
                        <CounterInput label={"Auto L1 Coral"} value={autoL1Coral} onChange={setAutoL1Coral} />
                    </div>

                    <div className="flex flex-col space-y-5">
                        <CounterInput label={"Auto L3 Algae Removed"} max={3} value={autoL3AlgaeRemoved} onChange={setAutoL3AlgaeRemoved} />
                        <CounterInput label={"Auto L2 Algae Removed"} max={3} value={autoL2AlgaeRemoved} onChange={setAutoL2AlgaeRemoved} />
                        <CounterInput label={"Auto Barge Algae"} max={9} value={autoBargeAlgae} onChange={setAutoBargeAlgae} />
                        <CounterInput label={"Auto Processor Algae"} max={9} value={autoProcessorAlgae} onChange={setAutoProcessorAlgae} />
                    </div>
                </div>
            </>
        );
    */
    if (section === "setup") {
        content = (
            <>
                <Dropdown label="Event" placeholder={"Select event"} value={eventName} onChange={setEventName} options={events} />
                <IntegerInput value={matchNumber} onChange={setMatchNumber} label={"Match Number"} placeholder="e.g. 42" min={1} />
                <IntegerInput value={teamNumber} onChange={setTeamNumber} label={"Team Number"} placeholder="e.g. 3464" min={1} />
            </>
        );
    } else if (section === "auto") {
        content = (
            <>

            </>
        );
    } else if (section === "teleop") {
        content = (
            <>
            
            </>
        );
    } else if (section === "endgame") {
        content = <>
            <Dropdown label="Endgame Action" placeholder={"Select action"} value={endgameAction} onChange={setEndgameAction} options={endgameActions} />
            <BinaryChoice label="Robot error during match?" options={["Yes", "No"]} button1Selected={hadError} onChange={changeError} />
            {hadError && (<Dropdown label="What went wrong?" placeholder={"Select one"} value={robotError} onChange={setRobotError} options={robotErrors} />)}
            <div className="flex flex-col items-center space-y-2">
                <h3 className="font-semibold text-white text-2xl pb-1">Additional Notes?</h3>
                <AutoResizeTextarea placeholder="(Leave blank if none)" value={notes} onChange={setNotes} />
                <h3 className="font-semibold text-white text-2xl pb-1">submissions are attatched to names</h3>
            </div>
            <button className={buttonStyle} onClick={submitData}>Submit</button>
            {(!sent) ? (
                <div className="flex flex-col items-center space-y-2 ">
                    <h3 className="font-semibold text-red-800 text-2xl pb-1">If you are seeing this message, you either have poor connectivity, or you have encountered an error. If you encountered an error, a message should have shown up stating you had an error. If no message showed up, then you're connectivity is poor. If your data gets sent, then this page will automatically close. If you need to fill out another form, you may press the back button, but remember to submit later in the "view local storage" page.</h3>
                    <button className={buttonStyle} onClick={goBack}>Back</button>
                </div>
            ) : (<></>)}
        </>
    }

    return (
        <div className="flex flex-col items-center justify-start space-y-6 pt-12.5">
            <button className={buttonStyle} onClick={goBack}>Back</button>
            <h1 className="font-bold text-white text-4xl pb-1">Scouting Match</h1>
            <div className="flex flex-row space-x-4 pb-5">
                <button className={tab("setup")} onClick={() => setSection("setup")}>Setup</button>
                <button className={tab("auto")} onClick={() => setSection("auto")}>Auto</button>
                <button className={tab("teleop")} onClick={() => setSection("teleop")}>Teleop</button>
                <button className={tab("endgame")} onClick={() => setSection("endgame")}>Endgame</button>
            </div>
            {content}
        </div>
    );
}

export default MatchForm;