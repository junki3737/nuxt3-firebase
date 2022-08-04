export default defineNuxtRouteMiddleware(async (from, to) => {
    if (!process.server) {
      const { checkAuthState, token } = useAuth();
      await checkAuthState();
      if (
        !token.value &&
        from.name !== 'auth-signin' &&
        to.name !== 'auth-signin'
      )
        return navigateTo('/auth/signin', { replace: true });
      if (token.value && from.name !== 'dashboard')
        return navigateTo('/dashboard', { replace: true });
    }
  });