import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "next-14-admin-panel.firebaseapp.com",
  projectId: "next-14-admin-panel",
  storageBucket: "next-14-admin-panel.appspot.com",
  messagingSenderId: "1038028547206",
  appId: "1:1038028547206:web:d5b3e0759e016823d61d07",
};

export const app = initializeApp(firebaseConfig);
