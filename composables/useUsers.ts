import { UidType, UsersType } from '@/types';
import {
  arrayUnion,
  doc,
  Firestore,
  collection,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { getUserSession } from '@/helper/SessionStorage';
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
    // console.info("uid is "+uid)
    // if (!uid) return;
    try {
      user.value.uid = uid;
      const userDoc = await getUser(uid);
      user.value.email = userDoc ? userDoc.email : '';
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
  async function setUserStateBySessionStorage() {
    try {
      const sessionObj = await getUserSession();
      user.value.uid = sessionObj.uid;
      user.value.email = sessionObj.email;
      user.value.displayName = sessionObj.displayName;
      user.value.photoUrl = sessionObj.photoUrl;
      user.value.tag = sessionObj.tag;
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
  async function addUserTag(uid: UidType, tag: string) {
    if (!uid) return;
    try {
      const db: Firestore = useState('db').value as Firestore;
      await updateDoc(doc(db, CollectionName, uid), {
        tag: arrayUnion(tag),
      });
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
  return { getUser, setUserState, addUser, setUserStateBySessionStorage, addUserTag,
    user };
};

