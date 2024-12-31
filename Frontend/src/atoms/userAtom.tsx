import { atom } from "recoil";

interface User {
  id: number;
  username: string;
  email: string;
}

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      // Check if there's a saved user in localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          setSelf(JSON.parse(savedUser)); // Set the user from localStorage
        } catch (error) {
          console.error('Failed to parse user from localStorage:', error);
          localStorage.removeItem('user'); // Clean up invalid entry
        }
      }

      // Sync the atom with localStorage on change
      onSet((newValue) => {
        if (newValue) {
          try {
            localStorage.setItem('user', JSON.stringify(newValue));
          } catch (error) {
            console.error('Failed to save user to localStorage:', error);
          }
        } else {
          localStorage.removeItem('user');
        }
      });
    },
  ],
});
