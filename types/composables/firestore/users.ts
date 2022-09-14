export type UidType = string;
export type UsersType = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  tag: Array<string> | null;
};
