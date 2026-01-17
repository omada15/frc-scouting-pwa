import React from "react";
import { useNavigate } from "react-router-dom";
import { readCookie } from "../scripts/user";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const goToMatchForm = () => {
        navigate("/match");
    };
    const goToLocalStorage = () => {
        navigate("/stored");
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="font-bold text-white text-4xl underline">
                {readCookie("user") === undefined
                    ? "Welcome to Sim-scouting!"
                    : "Welcome to Sim-scouting, " + readCookie("user")}
            </h1>
            <p className="text-gray-200 text-center w-full max-w-xl">
                At Sim-City, we realized effective scouting requires simple
                technology, which is why we created Sim-Scouting to simplify the
                scouting experience.
            </p>
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
        </div>
    );
};

export default Home;
