import { initializeApp } from "firebase/app";
import { generateCookie } from "./user";

async function writeData(
    path: string,
    data: Record<string, any>,
) {
    try {
        let body = {
            path: path,
            data: data,
        };
        fetch("http://localhost:3000/write", {
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
        const response = await fetch("http://localhost:3000/read", {
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
    const response = fetch("http://localhost:30678776670/register", {
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
    const response = await fetch("http://localhost:3000/login", {
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
