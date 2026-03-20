import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readCookie, deleteCookie, generateCookie } from "../scripts/user";
import { de } from "../scripts/firebase";
import BinaryChoice from "../components/BinaryChoice";

let debug = await de();

export { debug };
const signedIn = readCookie("user");

const Home: React.FC = () => {

    const [nameCSS, setNameCSS] = useState<string>("text-white underline")

    const [advanced, setAdvanced] = useState<boolean>(
        readCookie("dih") == "true",
    );
    const navigate = useNavigate();

    const goToMatchForm = () => {
        navigate("/match");
    };
    const goToLocalStorage = () => {
        navigate("/stored");
    };
    const goToPitScoutingForm = () => {
        navigate("/pitscouting");
    };
    const signOut = () => {
        deleteCookie("user");
        deleteCookie("uid");
        navigate("/login");
    };
    useEffect(() => {
        if (readCookie("user") == undefined) {
            navigate("/login");
        } else if (readCookie("user") == "William Ding" || readCookie("user") == "Dev" || readCookie("user") == "sam meng" ){
            setNameCSS("bg-gradient-to-r from-red-500 via-green-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x inline-block font-bold underline")
        } else if (readCookie("user") == "Estiaan K") {
            setNameCSS("bg-gradient-to-r from-yellow-400 via-yellow-100 to-yellow-400 bg-clip-text text-transparent animate-gradient-x inline-block font-bold underline")
        } else if (readCookie("user") == "Daniel Senchukov"){
            setNameCSS("bg-gradient-to-r from-red-700 via-red-900 to-red-700 bg-clip-text text-transparent animate-gradient-x inline-block font-bold underline")
        }
        
    }, []);
    
    return (
        <div className="flex flex-col items-center justify-center space-y-6 w-full">
            <h1 className="font-bold text-white text-4xl underline text-center flex flex-row">
                {readCookie("user") === undefined
                    ? "Welcome to Sim-scouting!"
                    : "Welcome to Sim-scouting, " + '\u00A0'    
                }            
                <div className={nameCSS}>
                    {" " + readCookie("user")}
                </div>

            </h1>

            <p className="text-gray-200 text-center w-full max-w-xl">
                At Sim-City, we realized effective scouting requires simple
                technology, which is why we created Sim-Scouting to simplify the
                scouting experience.
            </p>

            <div>
                {debug && (
                    <p className="font-small text-red-500 text-2xl px-4 py-3 rounded-2xl text-center">
                        Advanced user detected
                        <br></br>
                        Online Users tab can be found
                        <br></br>
                        Seeder (adds random data) in localstorage
                    </p>
                )}
            </div>

            <button
                className="bg-sky-600 font-medium text-white text-3xl px-4 py-3 rounded-2xl hover:bg-sky-700 transition-colors"
                onClick={goToMatchForm}
            >
                Scout!
            </button>
            <button
                className="bg-green-600 font-medium text-white text-3xl px-4 py-3 rounded-2xl hover:bg-green-700 transition-colors"
                onClick={goToLocalStorage}
            >
                View Local Data
            </button>
            <button
                className="bg-rose-600 font-medium text-white text-3xl px-4 py-3 rounded-2xl hover:bg-rose-700 transition-colors"
                onClick={goToPitScoutingForm}
            >
                Pit scouting
            </button>
            {debug && (
                <button 
                    className="bg-red-600 font-medium text-white text-3xl px-4 py-3 rounded-2xl hover:bg-red-700 transition-colors"
                    onClick={() => {window.location.href="/online"}}
                >Online Users</button>
            )}
            {signedIn && (
                <button
                    className="bg-slate-600 font-medium text-white text-3xl px-4 py-3 rounded-2xl hover:bg-slate-700 transition-colors"
                    onClick={signOut}
                >
                    Sign out
                </button>
            )}
            <div>
                <BinaryChoice
                    label={"Data protect"}
                    options={["yes", "no"]}
                    value={advanced}
                    onChange={(e) => {
                        setAdvanced(e);
                        generateCookie("dih", `${e}`, 7);
                    }}
                />
            </div>
        </div>
    );
};

export default Home;
