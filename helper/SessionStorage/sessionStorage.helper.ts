import { UidType} from '@/types';

export const UserSessionStorageKey = 'USER_SESSION_STORAGE_KEY';
import { useStorage } from '@vueuse/core';

export const setUserSession = async (uid: UidType) => {
  if (!uid) return;
  const { getUser } = useUsers();
  const userDoc = await getUser(uid);
  // Session削除
  removeUserSession();
  // TODO: 型エラーを解決すること
  // Session登録
  useStorage<UidType>(
    UserSessionStorageKey,
    userDoc,
    sessionStorage
  );
};

export const getUserSession = () => {
  const sessionObj = JSON.parse(
    sessionStorage.getItem(UserSessionStorageKey) as string
  );
  const returnObj = {
    uid: sessionObj.uid,
    email: sessionObj.email,
    displayName: sessionObj.displayName,
    photoUrl: sessionObj.photoUrl,
    tag: sessionObj.tag,
  };
  return returnObj;
};
export const removeUserSession = () => {
  return sessionStorage.removeItem(UserSessionStorageKey);
};
