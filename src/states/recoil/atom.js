import { atom } from "recoil";

export const testAtom = atom({
  key: "projectAtom",
  default: {
    test: 'test'
  },
});