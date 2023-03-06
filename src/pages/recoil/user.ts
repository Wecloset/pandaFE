import { atom, selector } from "recoil";
import { v1 } from "uuid";

const userState = atom({
  key: `userState/${v1()}`,
  default: {},
});

const currentUserState = selector({
  key: `currentUserState/${v1()}`,
  get: ({ get }) => {
    const userData = get(userState);
    return userData;
  },
});

export { userState, currentUserState };
