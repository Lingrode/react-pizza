import { useTranslation } from "react-i18next";
import { IngredientsItem } from "../IngredientsItem";

import style from "./IngredientsList.module.scss";

export type IngredientsLang = {
  en: string[];
  ua: string[];
};

type IngredientsListProps = {
  list: string[];
};

export const IngredientsList = ({ list }: IngredientsListProps) => {
  const { t } = useTranslation("fullPizza");

  return (
    <ul className={style.list}>
      {t("list_name")}
      {list.map((item: string, idx: number) => (
        <li key={idx}>
          <IngredientsItem text={item} />
        </li>
      ))}
    </ul>
  );
};
