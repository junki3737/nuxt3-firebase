export default defineNuxtRouteMiddleware(async (from, to) => {
    if (!process.server) {
      const { checkAuthState, token } = useAuth();
      const { user, setUserStateBySessionStorage } = useUsers();
      console.log('=== ミドルウェア ===');
      // 認証チェック
      await checkAuthState();
      // Userステートが消えた場合、セッションストレージから復元
      if (token.value && !user.value.uid) {
        setUserStateBySessionStorage();
      }
      // 認証トークンが無くて、遷移元・遷移先がサインイン画面じゃない場合
      if (
        !token.value &&
        from.name !== 'auth-signin' &&
        to.name !== 'auth-signin'
      )
        return navigateTo('/auth/signin', { replace: true });
      // 認証トークンが無くて、遷移元・遷移先がダッシュボード画面じゃない場合
      if (
        token.value &&
        from.name !== 'dashboard' &&
        to.name !== 'dashboard'
      )
        return navigateTo('/dashboard', { replace: true });
    }
  });
  