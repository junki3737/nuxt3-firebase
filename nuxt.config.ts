import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        "vuetify/lib/styles/main.sass"
    ],
    build: {
        transpile: ["vuetify"]
    },
    vite: {
        define: {
            "process.env.DEBUG": false
        }
    },
    typescript: {
      strict: true,
    },
    runtimeConfig: {
      public: {
        firebaseApiKey: process.env.FIREBASE_API_KEY,
        firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
        // firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      },
    },
})
