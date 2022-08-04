import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const useAuth = () => {
  const token = useState<string | null | undefined>(
    'token',
    () => null
  );
    // TODO: 管理方法をもう少し考える…
    const uid = useState<string | null>('uid', () => null);
    const email = useState<string | null>('email', () => null);
    const displayName = useState<string | null>(
      'displayName',
      () => null
    );
    const photoUrl = useState<string | null>(
      'photoUrl',
      () => null
    );

  async function signIn(email: string, password: string) {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user
            .getIdToken() // トークン情報
            .then((idToken) => {
              token.value = idToken;
              resolve();
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  async function signInByGoogleAuthProvider() {
    return await new Promise<void>((resolve, reject) => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      return signInWithPopup(auth, provider)
        .then((result) => {
          const credential =
            GoogleAuthProvider.credentialFromResult(result);
          token.value = credential?.accessToken;
          resolve();
        })
        .catch(reject);
    });
  }

  async function signOut() {
    return await new Promise<void>((resolve, reject) => {
      console.log("sign out now")
      const auth = getAuth();
      firebaseSignOut(auth)
        .then(() => {
          token.value = null;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function checkAuthState() {
    return await new Promise<void>((resolve, reject) => {
      // client only
      if (process.server) return resolve();
      const auth = getAuth();
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            displayName.value = user.displayName;
            email.value = user.email;
            photoUrl.value = user.photoURL;
            // console.log('=== checkAuthState ===');
            // console.log(uid.value);
            // console.log(displayName.value);
            // console.log(email.value);
            user
              .getIdToken()
              .then((idtoken) => {
                token.value = idtoken;
                resolve();
              })
              .catch(reject);
          } else {
            token.value = null;
            resolve();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  return {
    signIn,
    signInByGoogleAuthProvider,
    signOut,
    token,
    checkAuthState,
    uid,
    photoUrl,
    displayName,
    email,
  };
};