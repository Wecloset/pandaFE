import { getSession } from "next-auth/react";
import {
  atom,
  AtomEffect,
  DefaultValue,
  selector,
  selectorFamily,
} from "recoil";
import { v1 } from "uuid";
import { axiosGet } from "../utils/services";

const getUser = async (email: string) => {
  const { data } = await axiosGet(`/api/user?email=${email}`);
  return data.user;
};

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet, trigger }) => {
    const loadPersisted = () => {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) setSelf(JSON.parse(savedValue));
    };

    if (trigger === "get") {
      // getSession().then(session => {
      //   if (!session) {
      //     typeof window !== "undefined" ?? localStorage.removeItem(key);
      //     return;
      //   }
      // });
      loadPersisted();
    }
    // onSet -> Subscribe to changes in the atom value.
    onSet((newValue, oldValue, isReset) => {
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
  get: userID => async () => {
    const id = userID as string;
    const response = await getUser(id);
    if (response.error) {
      throw response.error;
    }
    return response;
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

const currentUserState = selector({
  key: `currentUserState/${v1()}`,
  get: async ({ get }) => {
    const userData = get(currentUserInfoQuery);
    return userData;
  },
  set: ({ set }, val = new DefaultValue()) => {
    set(userEmailState, val);
  },
});

export { userEmailState, currentUserInfoQuery, currentUserState };
