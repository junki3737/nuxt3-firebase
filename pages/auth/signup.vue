<script setup lang="ts">

import { ref } from "vue";

definePageMeta({
  middleware: ['auth'],
});
import {
  UidType,
  ErrorType,
  ResultType,
  UsersType,
  ValidationRuleType,
} from '@/types';
const email = ref("");
const password = ref("");
const rePassword = ref("");

const setEmail = (value: string) :void => {
  email.value = value;
};

const setPassword = (value: string) :void => {
  password.value = value;
};

const setRePassword = (value: string) :void => {
  rePassword.value = value;
};
const signup = async () => {
  try {
    // バリデーションチェック
    // if (!formValidate) return;
    console.log(email.value)
    console.log(password.value)
    const { signUp, checkAuthState } = useAuth();
    const { user } = useUsers();
    await signUp(email.value, password.value);
    await checkAuthState();
    if (user.value.uid) {
      const userInfo: UsersType = {
        uid: user.value.uid,
        displayName: user.value.displayName,
        email: user.value.email,
        photoUrl: user.value.photoUrl,
        tag: [],
      };
      await addSignUpUser(user.value.uid, userInfo);
    }
  } catch (e: ErrorType) {
    console.error(e);
  }
};
const addSignUpUser = async (
  uid: UidType,
  userInfo: UsersType
) => {
  const { addUser } = useUsers();
  const result: ResultType = (await addUser(
    uid,
    userInfo
  )) as ResultType;
  if (result.status === 200) {
    return navigateTo('/dashboard', { replace: true });
  } else {
    console.error(result.errorCode);
    console.error(result.description);
  }
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
      <!-- <div class="mx-15 mt-5">
      <user-form-name
        :type="'password'"
        :label="'Password(もう一度)'"
        @setPassword="setRePassword"
      />
      </div> -->
      <!-- <span>
        {{ checkPassword }}
      </span> -->
      <div class="mt-15">
      <v-row class="justify-center mt-15 mb-5">
      <v-btn
        :loading="loading"
        @click="signup"
        color="#99F"
        width="300"
        class="white-text"
      >
        サインアップ
      </v-btn>
      </v-row>
      </div>
      <p>
      アカウントをお持ちの方は
      <nuxt-link to="/auth/signin">サインイン</nuxt-link>
      </p>
  </div>
</template>
