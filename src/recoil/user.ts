import { atom, AtomEffect, selector, selectorFamily } from "recoil";
import { v1 } from "uuid";
import { apiGet } from "../utils/request";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet, trigger }) => {
    const loadPersisted = () => {
      const savedValue =
        typeof window !== "undefined" ? localStorage.getItem(key) : undefined;
      if (!savedValue) return;
      setSelf(JSON.parse(savedValue as string));
    };

    if (trigger === "get") {
      loadPersisted();
    }
    // onSet -> Subscribe to changes in the atom value.
    onSet((newValue, oldValue, isReset) => {
      console.log(newValue);
      console.log(isReset);
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const userEmailState = atom({
  key: `userEmail/${v1()}`,
  default: "",
  effects_UNSTABLE: [localStorageEffect("current_user")],
});

const userInfoQuery = selectorFamily({
  key: `UserInfoQuery/${v1()}`,
  get: userEmail => async () => {
    const email = userEmail as string;
    const response = await apiGet.GET_USER(email);
    if (response.error) {
      throw response.error;
    }
    return response.user;
  },
  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});

const currentUserInfoQuery = selector({
  key: `CurrentUserInfoQuery/${v1()}`,
  get: ({ get }) => {
    const currentUserEmail = get(userEmailState);
    if (currentUserEmail === "") return undefined;
    const userInfo = get(userInfoQuery(currentUserEmail));
    return userInfo;
  },
});

export { userEmailState, userInfoQuery, currentUserInfoQuery };
