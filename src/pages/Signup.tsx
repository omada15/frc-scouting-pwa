import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../scripts/firebase";

const SignupPage: React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
        if (password.length <= 6) {
            alert("Password must be longer than 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        } else {
            registerUser(email, password, name);
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };
    const buttonStyle: string =
        "bg-sky-600 text-white font-semibold text-xl px-2 py-2 rounded-full hover:bg-sky-700 transition-colors h-15 w-35";

    return (
        <div className="flex flex-col items-center justify-start space-y-8 pt-20 min-h-screen">
            <button className={buttonStyle} onClick={goBack}>
                Back
            </button>
            <h1 className="font-bold text-white text-4xl">Sign Up</h1>
            <p className="font-bold text-white text-xl pl-4 pr-4">
                Use your REAL, FULL NAME. You cannot change your name after
                creating your account
            </p>
            <p className="font-bold text-white text-xl pl-4 pr-4">
                Submissions under a false name will not be counted
            </p>
            <div className="flex flex-col space-y-6 w-80">
                <input
                    type="text"
                    placeholder="Name"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-2xl shadow"
                    onClick={handleSignup}
                >
                    Create Account
                </button>
            </div>

            <button
                className="text-blue-400 hover:text-blue-300 text-sm pt-2"
                onClick={goToLogin}
            >
                Already have an account? Log in
            </button>
        </div>
    );
};

export default SignupPage;
