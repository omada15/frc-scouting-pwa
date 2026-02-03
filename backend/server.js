import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const router = express.Router();
const PORT = 3000;

const allowedOrigins = [
    "http://localhost:5173",
    "https://3464scouting.vercel.app",
];

app.use(express.json());
app.use(
    cors({
        origin: allowedOrigins,
    }),
);

router.post("/write", async (req, res) => {
    console.log(req.body);
    try {
        const { path, data } = req.body;

        if (!path || !data) {
            return res.status(400).send("Missing required fields");
        }

        const pathSegments = path.split("/");
        const docRef = db.doc(pathSegments.join("/"));
        await docRef.set(data, { merge: true });

        res.send("Data written successfully");
        } catch (error) {
        console.error(`Error writing data: ${error.message}`);
        res.status(500).send(`Error: ${error.message}`);
    }
});

router.post("/read", async (req, res) => {
    console.log(req.body);
    try {
        const { path } = req.body;
        if (!path) {
            return res.status(400).send("Missing required fields");
        }
        const pathSegments = path.split("/");
        const docRef = db.doc(pathSegments.join("/"));
        const snapshot = await docRef.get();

        if (!snapshot.exists) {
            return res.status(404).send("Document not found");
        }
        console.log(snapshot.data());
        res.json(snapshot.data());
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error: ${error.message}`);
    }
});

router.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        res.status(201).json({
            message: "User created successfully",
            uid: userRecord.uid,
            email: userRecord.email,
            name: name
        });
    } catch (error) {
        console.error(error);
        if (error.code === "auth/email-already-exists") {
            return res.status(400).send("Email already in use");
        }
        if (error.code === "auth/invalid-email") {
            return res.status(400).send("Invalid email address");
        }
        if (error.code === "auth/weak-password") {
            return res.status(400).send("Password is too weak");
        }
        res.status(500).send(`Error: ${error.message}`);
    }
});

router.post("/login", async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const userRecord = await admin.auth().getUserByEmail(email);
        const customToken = await admin
            .auth()
            .createCustomToken(userRecord.uid);

        res.json({
            message: "Login successful",
            customToken,
            uid: userRecord.uid,
            email: userRecord.email,
            name: userRecord.displayName,
        });
    } catch (error) {
        console.error(error);
        if (error.code === "auth/user-not-found") {
            return res.status(401).send("Invalid email or password");
        }
        res.status(500).send(`Error: ${error.message}`);
    }
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
