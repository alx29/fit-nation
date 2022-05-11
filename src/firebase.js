import { useEffect, useState } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCG5tR7gGm4zgEc-rW0SJZmKe0q7iDtGKc',
  authDomain: 'fit-nation-auth-dev.firebaseapp.com',
  projectId: 'fit-nation-auth-dev',
  storageBucket: 'fit-nation-auth-dev.appspot.com',
  messagingSenderId: '609394848191',
  appId: '1:609394848191:web:83e9be2a93e2cf3a97f10a',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  return currentUser;
}
