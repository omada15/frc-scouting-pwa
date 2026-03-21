import type { Config } from "tailwindcss";

const config: Config = {
    plugins: [],
    theme: {
        extend: {
            keyframes: {
                gradient: {
                    "0%": {"background-position": "0%, 100%"},
                    "100%": {"background-position": "100%, 0%"},
                },
            },
            animation: {
                gradient: "gradient 3s linear infinite",
                quick: "gradient 0.5s linear infinite"
            },
        },
    },
};

export default config;