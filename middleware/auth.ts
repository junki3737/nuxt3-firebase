export default defineNuxtRouteMiddleware(async (from, to) => {
    if (!process.server) {  
        // フロントの時　
      const { checkAuthState, token } = useAuth();
      await checkAuthState();
      if (
        !token.value &&  // トークンがない時
        from.name !== 'auth-signin' && 
        to.name !== 'auth-signin'  // 既にsign in にいるとき関係ない時
      )
        return navigateTo('/auth/signin', { replace: true });
      if (token.value && from.name !== 'dashboard' && to.name !== 'dashboard') //もとがダッシュボードでないとき 無限ループを防ぐ
        return navigateTo('/dashboard', { replace: true });
    }
  });