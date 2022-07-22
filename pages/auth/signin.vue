<script setup lang="ts"> 
import { ref } from 'vue';

const email = ref("");
const password = ref("");

// const emailSignIn = async () => {
//   const { signIn, token } = useAuth();
//   await signIn(email.value, password.value);
//   // ダッシュボードへ遷移
//   navigateTo('/', { replace: true });
// };

// const googleSignIn = async () =>{
//   const { signInByGoogleAuthProvider, token } = useAuth();
//   await signInByGoogleAuthProvider();
//   navigateTo('/', { replace: true });
// };

const setEmail = (value: string) :void => {
    email.value = value;
};

const setPassword = (value: string) :void => {
    password.value = value;
};
</script>

<template>
  <div>
      <div class="mx-15 mt-15">
      <user-form-name
        :type="'email'"
        :label="'E-mail'"
        @setEmail="setEmail"
      />
      </div>
      <div class="mx-15 mt-5">
      <user-form-name
        :type="'password'"
        :label="'Password'"
        @setPassword="setPassword"
      />
      </div>
        <!-- <v-btn @click="googleSignIn">
          Google Login
        </v-btn> -->
      <div class="mt-15">
      <v-row class="justify-center mt-15 mb-5">
      <!-- <v-btn
        @click="emailSignIn"
        color="#99F"
        width="300"
      >
        ログイン
      </v-btn> -->
      </v-row>
      </div>
      <p>
      アカウントをお持ちで無い方は
      <nuxt-link to="/auth/signup">サインアップ</nuxt-link>
      </p>
  </div>
</template>
