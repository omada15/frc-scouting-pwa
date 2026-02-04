import { initializeApp } from "firebase/app";
import { generateCookie } from "./user";

const LINK = "https://scout4364i.vercel.app";
//const LINK = "http://localhost:3000/api";

async function writeData( // mustard
    path: string,
    data: Record<string, any>,
) {
    try {
        let body = {
            path: path,
            data: data,
        };
        fetch(LINK + "/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return true;
    } catch (err) {
        console.error("Error writing document:", err);
        alert(
            "An error occured: your data has been saved locally but not uploaded.",
        );
        return false;
    }
}
export async function fetchDebug() {
    const response = await fetch(LINK + "/debug", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}
export async function writeToDb(path: string, data: Record<string, any>) {
    let p = await readDoc("/datas/data");
    p = p.team;
    if (p && !p.includes(data.teamNumber)) {
        p.push(data.teamNumber);
        await writeData( "datas/data", {
            team: p,
        });
    }
    return await writeData( path, data);
}
export async function readDoc(path: string): Promise<any> {
    try {
        const response = await fetch(LINK + "/read", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ path: path }),
        });

        // Check if the server actually responded successfully
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return data; // This sends the data back to whoever called readDoc()
    } catch (error) {
        console.error("Error reading document:", error);
        throw error;
    }
}
export async function readData(path: string) {}

export async function registerUser(
    email: string,
    password: string,
    name: string,
) {
    const response = fetch(LINK + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
        }),
    });
    const data = await (await response).json();
    generateCookie("user", data.name, 7);
    window.location.href = "/";
    console.log(data);
}

export async function loginUser(email: string, password: string) {
    const response = await fetch(LINK + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    const data = await response.json();
    generateCookie("user", data.name, 7);
    window.location.href = "/";
    console.log(data);
}
