import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_CREDENTIALS_PATH;

if (!serviceAccountPath) {
  console.error("Brak ścieżki FIREBASE_CREDENTIALS_PATH w pliku .env!");
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccountPath),
});

export const db = getFirestore();
export const auth = getAuth();
