import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { IToDo, toDoState, categoryList } from "../atoms";

function ToDo({ text, category: currentCategory, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryList);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      return newToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map(
        (category) =>
          currentCategory !== category && (
            <button key={category} name={category} onClick={onClick}>
              {category}
            </button>
          )
      )}
    </li>
  );
}

export default ToDo;
