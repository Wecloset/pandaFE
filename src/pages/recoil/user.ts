import { atom, selector } from "recoil";

const currentUserEmailState = atom<string>({
  key: "currentUserEmailState",
  default: "",
});

const currentUserState = selector({
  key: "currentUserState",
  get: ({ get }) => {
    const userEmail = get(currentUserEmailState);

    return userEmail;
  },
});

export { currentUserEmailState, currentUserState };
