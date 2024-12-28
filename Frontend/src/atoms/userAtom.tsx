import { atom } from "recoil";

interface User {
    id: string;
    username: string;
    email: string;
    bio?: string; // Optional field
}

export const userAtom = atom<User | null>({
    key: 'userAtom',
    default: null
});
  