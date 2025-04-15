import { initializeApp } from "firebase-admin";
import { cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import "server-only";

const decodeKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY as string,
  "base64"
).toString("utf-8");

export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodeKey,
});

if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
  });
}

export const adminApp = initializeApp({
  credential: firebaseCert,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const db = getFirestore();
export const storgage = getStorage().bucket();
