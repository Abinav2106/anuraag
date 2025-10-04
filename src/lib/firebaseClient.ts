// src/lib/firebaseClient.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all required environment variables are present
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
  console.warn("Firebase environment variables are missing. Please check your .env.local file.");
  console.warn("Required variables:", {
    apiKey: !!firebaseConfig.apiKey,
    authDomain: !!firebaseConfig.authDomain,
    projectId: !!firebaseConfig.projectId,
    appId: !!firebaseConfig.appId
  });
  
  // Use fallback values for development
  const fallbackConfig = {
    apiKey: firebaseConfig.apiKey || "demo-key",
    authDomain: firebaseConfig.authDomain || "demo-project.firebaseapp.com",
    projectId: firebaseConfig.projectId || "demo-project",
    appId: firebaseConfig.appId || "demo-app-id",
  };
  
  console.warn("Using fallback configuration for development");
  Object.assign(firebaseConfig, fallbackConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
