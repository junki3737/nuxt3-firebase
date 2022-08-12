import { ResultType, UidType, UsersType } from '@/types';
import {
  doc,
  Firestore,
  getDoc,
  setDoc,
  getFirestore
} from 'firebase/firestore';
const CollectionName = 'users';

export const useUsers = () => {
  const user = useState<UsersType>('user', () => ({
    uid: '',
    email: '',
    photoUrl: '',
  }));

  async function getUser(uid: UidType) {
    if (!uid) return;
    const db: Firestore = useState('db').value as Firestore;
    const docRef = doc(db, CollectionName, uid);
    const userDoc = await getDoc(docRef);

    return userDoc.data();
  }
  async function addUser(uid: UidType, userInfo: UsersType) {
    if (!uid) return;
    try {
      const db: Firestore = useState('db').value as Firestore;
      await setDoc(doc(db, CollectionName, uid), userInfo);
      // TODO: とりあえず
      return {
        status: 200,
        errorCode: '',
        description: '',
      } as ResultType;
    } catch (e: any) {
      console.error(e);
      // TODO: とりあえず
      return {
        status: 500,
        errorCode: '',
        description: '',
      } as ResultType;
    }
  }
  return { getUser, addUser, user };
};