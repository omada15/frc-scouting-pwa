import React, { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import CounterInput from "../components/CounterInput";
import BinaryChoice from "../components/BinaryChoice";
import NumericInput from "../components/IntegerInput";
import MultiCounterInput from "../components/MultiCounterInput";
import IntegerInput from "../components/IntegerInput";
import Dropdown from "../components/Dropdown";
import CheckboxDropdown from "../components/CheckboxDropdown";
import AutoResizeTextarea from "../components/AutoResizeTextArea";
import { writeData } from "../scripts/firebase";
import { readCookie } from "../scripts/user";

const MatchForm: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/");
    };

    useEffect(() => {
        // useEffect to run after component mounts
        if (readCookie("user") == undefined) {
            navigate("/login");
        }
    }, []); // empty dependency array so only runs once
    const [section, setSection] = useState<
        "setup" | "auto" | "teleop" | "endgame" | "errors"
    >("setup");

    // this boolean is used to show a message if the data was not sent
    const [sent, setSent] = useState<boolean>(true);
    // Setup values
    const [eventName, setEventName] = useState<string>("");
    const [teamNumber, setTeamNumber] = useState(0);
    const [matchNumber, setMatchNumber] = useState(0);

    // Auto values
    const [autoBump, setAutoBump] = useState(false);
    const [autoUnderTrench, setAutoUnderTrench] = useState(false);
    const [autoFuel, setAutoFuel] = useState(0);
    const [autoClimbed, setAutoClimbed] = useState(false);
    const [autoPlayedDefense, setAutoPlayedDefense] = useState(false);

    // Teleop values
    const [teleopShift, setTeleopShift] = useState(1);

    const [shift1HubActive, setShift1HubActive] = useState(false);
    const [shift2HubActive, setShift2HubActive] = useState(false);
    const [shift3HubActive, setShift3HubActive] = useState(false);
    const [shift4HubActive, setShift4HubActive] = useState(false);

    const [shift1Fuel, setShift1Fuel] = useState(0);
    const [shift2Fuel, setShift2Fuel] = useState(0);
    const [shift3Fuel, setShift3Fuel] = useState(0);
    const [shift4Fuel, setShift4Fuel] = useState(0);

    const [shift1Defense, setShift1Defense] = useState(false);
    const [shift2Defense, setShift2Defense] = useState(false);
    const [shift3Defense, setShift3Defense] = useState(false);
    const [shift4Defense, setShift4Defense] = useState(false);

    // Endgame values
    const [endgameFuel, setEndgameFuel] = useState(0);
    const [endgameClimbLevel, setEndgameClimbLevel] = useState("0");

    const [endgameAction, setEndgameAction] = useState<string>("");
    const [hadError, setHadError] = useState<boolean | null>(null);
    const [robotError, setRobotError] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    // Error values

    const [otherRobotNotes, setOtherRobotNotes] = useState<string>("");

    const events = ["NE District Minuteman Event", "NE District URI Event"];

    const endgameActions = [
        // add
        "None",
        "Parked",
        "Shallow Climb",
        "Deep Climb",
    ];

    const robotErrors = [
        "Intake issues",
        "Climb Failed",
        "Robot unresponsive",
        "Robot part fell off",
        "Did not participate",
        "Auto Stop",
        "Robot could not get off after climb",
        "Other",
    ];

    function changeError(newValue: boolean) {
        setHadError(newValue);
        if (!hadError && robotError != "") {
            setRobotError("");
        }
    }
    async function submitData() {
        //make sure certain fields are filled out
        let debug = true;
        let check: boolean =
            eventName !== "" &&
            teamNumber !== null &&
            matchNumber !== null &&
            hadError !== null &&
            endgameAction !== "";

        const data = {
            // sample data object,
            name: readCookie("user"),
            eventName: eventName,
            teamNumber: teamNumber,
            matchNumber: matchNumber,
            
            autoBump: autoBump,
            autoUnderTrench: autoUnderTrench,
            autoFuel: autoFuel,
            autoClimbed: autoClimbed,
            autoPlayedDefense: autoPlayedDefense,

            shift1HubActive: shift1HubActive,
            shift2HubActive: shift2HubActive,
            shift3HubActive: shift3HubActive,
            shift4HubActive: shift4HubActive,

            shift1Fuel: shift1Fuel,
            shift2Fuel: shift2Fuel,
            shift3Fuel: shift3Fuel,
            shift4Fuel: shift4Fuel,

            shift1Defense: shift1Defense,
            shift2Defense: shift2Defense,
            shift3Defense: shift3Defense,
            shift4Defense: shift4Defense,

            notes: notes,
            endgameAction: endgameAction,
            hadError: hadError,
            robotError: robotError,
        };
        /*
        The path for block of data will be submitted as follows:
        /{eventName}/{teamNumber}/{matchNumber}/{timestamp}, timestamp is not finished
        */

        if (!check && !debug) {
            alert("Please fill out all required fields before submitting.");
        } else {
            localStorage.setItem(
                `scoutData-${teamNumber}-${matchNumber}`,
                JSON.stringify(data)
            );
            setSent(false);
            if (
                !(await writeData(
                    `${teamNumber?.toString()}/${matchNumber?.toString()}`,
                    data
                ))
            ) {
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
        `px-5 py-2 rounded-full font-semibold transition-colors ${
            section === name
                ? "bg-sky-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`;

    let content = null;

    const buttonStyle: string =
        "bg-sky-600 text-white font-semibold text-xl px-2 py-2 rounded-full hover:bg-sky-700 transition-colors h-15 w-35";

    if (section === "setup") {
        content = (
            <>
                <Dropdown
                    label="Event"
                    placeholder={"Select event"}
                    value={eventName}
                    onChange={setEventName}
                    options={events}
                />
                <IntegerInput
                    value={matchNumber}
                    onChange={setMatchNumber}
                    label={"Match Number"}
                    placeholder="e.g. 42"
                    min={1}
                />
                <IntegerInput
                    value={teamNumber}
                    onChange={setTeamNumber}
                    label={"Team Number"}
                    placeholder="e.g. 3464"
                    min={1}
                />
            </>
        );
    } else if (section === "auto") {
        content = (
            <>
                <MultiCounterInput
                    min={0}
                    max={999}
                    value={autoFuel}
                    onChange={setAutoFuel}
                    label={"Auto fuel"}
                />
                <BinaryChoice
                    label={"Auto climb succeed?"}
                    options={["yes", "no"]}
                    button1Selected={autoClimbed}
                    onChange={setAutoClimbed}
                />
                <BinaryChoice
                    label={"Over Bump?"}
                    options={["yes", "no"]}
                    button1Selected={autoBump}
                    onChange={setAutoBump}
                />
                <BinaryChoice
                    label={"Under Trench?"}
                    options={["yes", "no"]}
                    button1Selected={autoUnderTrench}
                    onChange={setAutoUnderTrench}
                />
                <BinaryChoice
                    label={"Play Defense"}
                    options={["yes", "no"]}
                    button1Selected={autoPlayedDefense}
                    onChange={setAutoPlayedDefense}
                />
            </>
        );
    } else if (section === "teleop") {
        let shiftcontent = null;
        if (teleopShift === 1) {
            shiftcontent = (
                <>
                    <BinaryChoice
                        label={"Hub Active?"}
                        options={["yes", "no"]}
                        onChange={setShift1HubActive}
                        button1Selected={shift1HubActive}
                    />
                    <MultiCounterInput
                        min={0}
                        max={999}
                        value={shift1Fuel}
                        onChange={setShift1Fuel}
                        label={"Fuel"}
                    />
                    <BinaryChoice
                        label={"Played Defense?"}
                        options={["yes", "no"]}
                        onChange={setShift1Defense}
                        button1Selected={shift1Defense}
                    />
                </>
            );
        } else if (teleopShift === 2) {
            shiftcontent = (
                <>
                    <BinaryChoice
                        label={"Hub Active?"}
                        options={["yes", "no"]}
                        onChange={setShift2HubActive}
                        button1Selected={shift2HubActive}
                    />
                    <MultiCounterInput
                        min={0}
                        max={999}
                        value={shift2Fuel}
                        onChange={setShift2Fuel}
                        label={"Fuel"}
                    />
                    <BinaryChoice
                        label={"Played Defense?"}
                        options={["yes", "no"]}
                        onChange={setShift2Defense}
                        button1Selected={shift2Defense}
                    />
                </>
            );
        } else if (teleopShift === 3) {
            shiftcontent = (
                <>
                    <BinaryChoice
                        label={"Hub Active?"}
                        options={["yes", "no"]}
                        onChange={setShift3HubActive}
                        button1Selected={shift3HubActive}
                    />
                    <MultiCounterInput
                        min={0}
                        max={999}
                        value={shift3Fuel}
                        onChange={setShift3Fuel}
                        label={"Fuel"}
                    />
                    <BinaryChoice
                        label={"Played Defense?"}
                        options={["yes", "no"]}
                        onChange={setShift3Defense}
                        button1Selected={shift3Defense}
                    />
                </>
            );
        } else if (teleopShift === 4) {
            shiftcontent = (
                <>
                    <BinaryChoice
                        label={"Hub Active?"}
                        options={["yes", "no"]}
                        onChange={setShift4HubActive}
                        button1Selected={shift4HubActive}
                    />
                    <MultiCounterInput
                        min={0}
                        max={999}
                        value={shift4Fuel}
                        onChange={setShift4Fuel}
                        label={"Fuel"}
                    />
                    <BinaryChoice
                        label={"Played Defense?"}
                        options={["yes", "no"]}
                        onChange={setShift4Defense}
                        button1Selected={shift4Defense}
                    />
                </>
            );
        }
        content = (
            <>
                <button
                    className={buttonStyle}
                    onClick={() => setTeleopShift(1)}
                >
                    T + S1
                </button>
                <button
                    className={buttonStyle}
                    onClick={() => setTeleopShift(2)}
                >
                    S2
                </button>
                <button
                    className={buttonStyle}
                    onClick={() => setTeleopShift(3)}
                >
                    S3
                </button>
                <button
                    className={buttonStyle}
                    onClick={() => setTeleopShift(4)}
                >
                    S4
                </button>

                <p className="font-bold text-white text-3xl pb-1">
                    Shift {teleopShift}
                </p>
                {shiftcontent}
                <p className="font-bold text-white text-l pb-1">
                    If the robot failed to lower from climb, state that in the errors tab
                </p>
            </>
        );
    } else if (section === "endgame") {
        content = (
            <>
                <MultiCounterInput
                    min={0}
                    max={999}
                    value={endgameFuel}
                    onChange={setEndgameFuel}
                    label={"Endgame fuel scored"}
                />
                <Dropdown
                    value={endgameClimbLevel}
                    options={["Didn't climb", "Level 1", "Level 2", "Level 3"]}
                    label={"Endgame Climb Level"}
                    onChange={setEndgameClimbLevel}
                />
            </>
        );
    } else if (section === "errors") {
        content = (
            <>
                <CheckboxDropdown
                    value={"will ding"}
                    options={robotErrors}
                    onChange={setEndgameAction}
                    placeholder="will ding"
                />
                <AutoResizeTextarea
                    value={otherRobotNotes}
                    onChange={setOtherRobotNotes}
                    placeholder="Other notes about robot"
                />    
                <button className={buttonStyle} onClick={submitData}>
                    Submit
                </button>
                {!sent ? (
                    <div className="flex flex-col items-center space-y-2 ">
                        <h3 className="font-semibold text-red-800 text-2xl pb-1">
                            If you are seeing this message, you either have poor
                            connectivity, or you have encountered an error. If
                            you encountered an error, a message should have
                            shown up stating you had an error. If no message
                            showed up, then you're connectivity is poor. If your
                            data gets sent, then this page will automatically
                            close. If you need to fill out another form, you may
                            press the back button, but remember to submit later
                            in the "view local storage" page.
                        </h3>
                        <button className={buttonStyle} onClick={goBack}>
                            Back
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </>
        );
    }

    return (
        <div className="overflow-x-auto flex flex-col items-center justify-start space-y-6 pt-12.5">
            <button className={buttonStyle} onClick={goBack}>
                Back
            </button>
            <h1 className="font-bold text-white text-4xl pb-1">
                Scouting Match
            </h1>
            <div className="flex flex-row space-x-4 pb-5">
                <button
                    className={tab("setup")}
                    onClick={() => setSection("setup")}
                >
                    Setup
                </button>
                <button
                    className={tab("auto")}
                    onClick={() => setSection("auto")}
                >
                    Auto
                </button>
                <button
                    className={tab("teleop")}
                    onClick={() => setSection("teleop")}
                >
                    Teleop
                </button>
                <button
                    className={tab("endgame")}
                    onClick={() => setSection("endgame")}
                >
                    Endgame
                </button>
                <button
                    className={tab("errors")}
                    onClick={() => setSection("errors")}
                >
                    Errors
                </button>
            </div>
            {content}
        </div>
    );
};

export default MatchForm;
