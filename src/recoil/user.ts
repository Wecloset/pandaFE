import { atom, AtomEffect, DefaultValue, selector } from "recoil";
import { v1 } from "uuid";
import { UserData } from "../types/data-type";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet, trigger }) => {
    const loadPersisted = async () => {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) setSelf(JSON.parse(savedValue));
    };

    if (trigger === "get") {
      loadPersisted();
    }

    // onSet -> Subscribe to changes in the atom value.
    onSet((newValue, oldValue, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const userState = atom<UserData | null>({
  key: `userState/${v1()}`,
  default: null,
  effects_UNSTABLE: [localStorageEffect<UserData | null>("current_user")],
});

const currentUserState = selector({
  key: `currentUserState/${v1()}`,
  get: ({ get }) => {
    const userData = get(userState);
    return userData;
  },
  set: ({ set }, val = new DefaultValue()) => {
    set(userState, val);
  },
});

export { userState, currentUserState };
