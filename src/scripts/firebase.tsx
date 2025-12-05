import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore } from "firebase/firestore";

interface FirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId?: string | undefined;
}

const firebaseConfig: FirebaseConfig = { // env has not been gitignored, add after
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_ID as string,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID as string | undefined,
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function writeData(path: string, data: Record<string, any>) {
  try {
    const docRef = doc(db, path);
    await setDoc(docRef, data, { merge: true }); // merge prevents overwriting entire doc
    console.log("Document written:", path);
    return true;
  } catch (err) {
    console.error("Error writing document:", err);
    alert("An error occured: your data has been saved locally but not uploaded.");
    return false;
  }
}