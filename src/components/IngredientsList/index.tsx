import { IngredientsItem } from "../IngredientsItem";

import style from "./IngredientsList.module.scss";

export type IngredientsLang = {
  en: string[];
  ua: string[];
};

type IngredientsListProps = {
  list: IngredientsLang;
};

export const IngredientsList = ({ list }: IngredientsListProps) => {
  return (
    <ul className={style.list}>
      Ingredients:
      {list.ua.map((item: string, idx: number) => (
        <li key={idx}>
          <IngredientsItem text={item} />
        </li>
      ))}
    </ul>
  );
};
