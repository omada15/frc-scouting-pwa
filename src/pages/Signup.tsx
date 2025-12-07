import React from "react";

const SignupPage: React.FC = () => {
    const handleSignup = () => {
        console.log("Signup clicked");
    };

    const goToLogin = () => {
        console.log("Go to login page");
    };

    return (
        <div className="flex flex-col items-center justify-start space-y-8 pt-20 min-h-screen">
            <h1 className="font-bold text-white text-4xl">Sign Up</h1>

            <div className="flex flex-col space-y-6 w-80">
                <input
                    type="text"
                    placeholder="Name"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="bg-gray-800 text-white px-4 py-3 rounded-2xl outline-none"
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
