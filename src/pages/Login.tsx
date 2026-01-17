import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../scripts/firebase";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        loginUser(email, password);
    };
    const goToSignup = () => {
        navigate("/signup");
    };
    const goBack = () => {
        navigate("/");
    };
    const buttonStyle: string =
        "bg-sky-600 text-white font-semibold text-xl px-2 py-2 rounded-full hover:bg-sky-700 transition-colors h-15 w-35";

    return (
        <div className="flex flex-col items-center justify-start space-y-8 pt-20 min-h-screen">
            <button className={buttonStyle} onClick={goBack}>
                Back
            </button>
            <h1 className="font-bold text-white text-4xl">Login</h1>
            <h1 className="font-bold text-white text-xl">
                For security reasons, all users must log in
            </h1>
            <div className="flex flex-col space-y-6 w-80">
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
                    onChange={(e) => [setPassword(e.target.value)]}
                />

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow"
                    onClick={handleLogin}
                >
                    Log In
                </button>
            </div>

            <button
                className="text-blue-400 hover:text-blue-300 text-sm pt-2"
                onClick={goToSignup}
            >
                No account? Sign up
            </button>
        </div>
    );
};

export default LoginPage;
