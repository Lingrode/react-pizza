import { IngredientsItem } from "../IngredientsItem";

import style from "./IngredientsList.module.scss";

type IngredientsListProps = {
  list: string[];
};

export const IngredientsList = ({ list }: IngredientsListProps) => {
  return (
    <ul className={style.list}>
      Ingredients:
      {list.map((item: string, idx: number) => (
        <li key={idx}>
          <IngredientsItem text={item} />
        </li>
      ))}
    </ul>
  );
};
