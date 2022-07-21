<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const passowrd = ref("");
const rePassword = ref("");

const setEmail = (value: string) :void => {
  email.value = value;
};

const setPassword = (value: string) :void => {
  passowrd.value = value;
};

const setRePassword = (value: string) :void => {
  rePassword.value = value;
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
      <v-row class="justify-center mt-15">
      <v-btn
        :loading="loading"
        @click="signin"
        color="#99F"
        width="300"
        class="white-text"
      >
        サインアップ
      </v-btn>
      </v-row>
      </div>
  </div>
</template>
