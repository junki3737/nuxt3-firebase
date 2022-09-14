import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  Auth,
} from 'firebase/auth';
import { useUsers } from './useUsers';

export const useAuth = () => {
  const token = useState<string | null | undefined>(
    'token',
    () => null
  );

  async function signIn(email: string, password: string) {
    return await new Promise<void>((resolve, reject) => {
      const auth: Auth = useState('auth').value as Auth;
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
      // const auth = getAuth();
      const auth: Auth = useState('auth').value as Auth;
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
  async function signUp(email: string, password: string) {
    return await new Promise<void>((resolve, reject) => {
      const auth: Auth = useState('auth').value as Auth;
      return createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then((userCredential) => {
          userCredential.user
            .getIdToken()
            .then((idToken) => {
              token.value = idToken;
              resolve();
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }


  async function signOut() {
    return await new Promise<void>((resolve, reject) => {
      console.log("sign out now")
      const auth: Auth = useState('auth').value as Auth;
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

  function checkAuthState() {
    return new Promise<void>((resolve, reject) => {
      // client only
      if (process.server) return resolve();
      const auth: Auth = useState('auth').value as Auth;
      onAuthStateChanged(
        auth,
        (userInfo) => {
          if (userInfo) {
            const { user } = useUsers();
            user.value.uid = userInfo.uid;
            user.value.displayName = userInfo.displayName;
            user.value.email = userInfo.email;
            user.value.photoUrl = userInfo.photoURL;
            userInfo
              .getIdToken()
              .then((idtoken) => {
                token.value = idtoken;
                console.info('=== checkAuthState ===');
                console.info(idtoken);
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
    signUp,
    signOut,
    checkAuthState,
    token,
  };
};