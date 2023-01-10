import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

const categoryEffect =
  (key: string) =>
  ({ onSet, setSelf }: any) => {
    const savedValue = localStorage.getItem(key);
    setSelf(() =>
      savedValue
        ? JSON.parse(savedValue)
        : [Categories.TO_DO, Categories.DOING, Categories.DONE]
    );

    onSet((newCategories: string[], _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newCategories));
    });
  };

const toDoEffect =
  (key: string) =>
  ({ onSet, setSelf }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newToDos: IToDo, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newToDos));
    });
  };

export const categoryList = atom<string[]>({
  key: "categoryList",
  default: [],
  effects: [categoryEffect("categories")],
});

export const categoryState = atom({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [toDoEffect("toDos")],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
