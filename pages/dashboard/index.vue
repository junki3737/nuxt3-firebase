<script setup lang="ts">

const { uid } = useAuth();
definePageMeta({
  middleware: ['auth'],
});

const signout = async () => {
  try {
    const { signOut } = useAuth();
    await signOut();
    // サインイン画面へ
    navigateTo('/auth/signout',{ replace: true });
    // 初期化
  } catch (e: any) {
    console.error(e);
  }
};
</script>
<template>
  <h1>this is dashboard page</h1>
  <button @click="signout">サインアウト</button>
</template>