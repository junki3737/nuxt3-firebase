import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'ストック管理',
    }
  },
    css: [
        "vuetify/lib/styles/main.sass"
    ],
    build: {
        transpile: ["vuetify"]
    },
    vite: {
        define: {
            "process.env.DEBUG": "false",
        }
    },
    typescript: {
      strict: true,
    },
    components: true,
    runtimeConfig: {
      public: {
        firebaseApiKey: process.env.FIREBASE_API_KEY,
        firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
        firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
        firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        firebaseAppId: process.env.FIREBASE_APP_ID,
        firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
})
