import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, Database } from "firebase/database";

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
const db: Database = getDatabase(app);

export const writeData = async (path: string, data: unknown): Promise<void> => {
  let output = "Nothing was run";
  const dbRef = ref(db, path);

  try {
    await set(dbRef, data);
    output = "Data was written";
  } catch (error) {
    output = `Error: ${error}`;
  }
  console.log(output);
};