import { initializeApp } from 'firebase/app';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
  };
  initializeApp(firebaseConfig);
});