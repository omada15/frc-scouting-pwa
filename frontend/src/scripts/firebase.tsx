import { generateCookie } from "./user";
import { readCookie } from "./user";
import { log } from "./log";

const LINK = window.location.href.includes("http://localhost:5173/")
    ? "http://localhost:3000/api"
    : "https://scout4364i.vercel.app/api";

async function sha256(message: string) {
    const msgBuffer = new TextEncoder().encode(message);

    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => ("00" + b.toString(16)).slice(-2))
        .join("");
    return hashHex;
}

export async function rt(path: string) {
    const response = await fetch(`${LINK}/readRt`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({path,}),
    });
    const data = await response.json()
    console.log(data.value)
    return data.value;
}

export async function de() {
    const uid = readCookie("uid");
    const response = await fetch(`${LINK}/debug`, {
        method: "GET",
    });
    let rawWhiteList = await response.json();

    let whiteList = rawWhiteList.value.split(",").map((s: string) => s.trim());
    return whiteList.includes(uid);
}

async function writeData(path: string, data: any) {
    try {
        let body = {
            path: path,
            data: data,
        };
        const response = await fetch(LINK + "/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            console.log(`Server error: ${response.status}`);
            return false;
        }
        return true;
    } catch (err) {
        console.error("Error writing document:", err);
        alert(
            "An error occured: your data has been saved locally but not uploaded.",
        );
        return false;
    }
}
export async function writeToDb(path: string, data: any, pit: boolean = false) {
    log(
        `submit data to team ${data.teamNumber} at match num ${data.matchNumber} from ${readCookie("user")}`,
    );
    if (!pit) {
        let p = await readDoc("/datas/data");
        p = p.team;
        if (p && !p.includes(data.teamNumber)) {
            log(`Add team ${data.teamnumber}`);
            p.push(data.teamNumber);
            await writeData("datas/data", {
                team: p,
            });
        }
    }
    return await writeData(path, data);
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

export async function registerUser(
    email: string,
    password: string,
    name: string,
) {
    try {
        const response = await fetch(LINK + "/register", {
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

        const data = await response.json();
        if (!response.ok) {
            log(`Register Error ${data.message}`);
            switch (data.message) {
                case "Email already in use":
                    return alert("Email already in use");

                case "Invalid email address":
                    return alert("Invalid email address");
                case "Password is too weak":
                    return alert("Password is too weak");
                default:
                    alert("Registration failed. Please try again.");
            }
        }
        let hashed = await sha256(password);
        console.log(hashed);
        writeData(`auth/${name}`, { hashed: hashed });
        generateCookie("user", data.name, 7);
        generateCookie("uid", data.uid, 7);

        window.location.href = "/";
        log(`Success with ${name} and ${password}`);
    } catch (error) {
        log(`Fail log in with ${error}`);
        console.error("Error registering user:", error);
    }
}

export async function loginUser(email: string, password: string) {
    try {
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

        let res = response.status;
        let data = await response.json();
        if (res == 200) {
            generateCookie("user", data.name, 7);
            generateCookie("uid", data.uid, 7);
            window.location.href = "/";
        } else {
            if (res == 401) {
                log(`invalid email password ${email}`);
                alert("Password or email invalid");
            } else {
                log(`error login with data ${data}`);
                alert("not good");
                window.location.href = "/login";
            }
        }
    } catch (err) {
        log(`login failure with ${email}`);
    }
}
export async function wsSend(message: string) {
    var l = window.location.href.includes("http://localhost:5173/")
        ? "ws://localhost:3000"
        : "wss://scout4364i.vercel.app/";
    let ws = new WebSocket(l);
    ws.onopen = () => {
        console.log("connected");
        ws.send(
            JSON.stringify({
                type: "clientHello",
                message,
            }),
        );
    };

    ws.onmessage = (event) => {
        console.log("received:", event.data);
    };
}
