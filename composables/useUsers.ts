import { UidType, UsersType } from '@/types';
import {
  doc,
  Firestore,
  getDoc,
  setDoc,
} from 'firebase/firestore';
const CollectionName = 'users';

export const useUsers = () => {
  const user = useState<UsersType>('user', () => ({
    uid: '',
    email: '',
    displayName: '',
    photoUrl: '',
    tag: [],
  }));


  async function getUser(uid: UidType) {
    if (!uid) return;
    const db: Firestore = useState('db').value as Firestore;
    const docRef = doc(db, CollectionName, uid);
    const userDoc = await getDoc(docRef);

    return userDoc.data();
  }
  async function setUserState(uid: UidType) {
    if (!uid) return;
    try {
      const userDoc = await getUser(uid);
      user.value.displayName = userDoc
        ? userDoc.displayName
        : '';
      user.value.photoUrl = userDoc ? userDoc.photoUrl : '';
      user.value.tag = userDoc ? userDoc.tag : [];
      return {
        status: 200,
        errorCode: '',
        description: '',
      };
    } catch (e: any) {
      // TODO: とりあえず
      return {
        status: 500,
        errorCode: '',
        description: '',
      };
    }
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
      };
    } catch (e: any) {
      console.error(e);
      // TODO: とりあえず
      return {
        status: 500,
        errorCode: '',
        description: '',
      };
    }
  }
  return { getUser, setUserState, addUser, user };
};

