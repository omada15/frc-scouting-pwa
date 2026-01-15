import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-zinc-800 text-gray-300 py-2 text-center">
            <p>Created by members of Team 3464 "Sim-City".</p>
            <a href="./stored" className="text-center text-gray-300">Stored Data </a>
        </footer>
    );
};

export default Footer;
