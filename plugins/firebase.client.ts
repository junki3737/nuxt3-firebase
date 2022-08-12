import { FirebaseApp, initializeApp } from 'firebase/app';
import { defineNuxtPlugin } from '#app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
  };
  const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(firebaseApp);
  const auth: Auth = getAuth();
  useState('firebaseApp', () => firebaseApp);
  useState('auth', () => auth);
  useState('db', () => db);
});