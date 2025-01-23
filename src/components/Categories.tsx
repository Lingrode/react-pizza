import { memo } from "react";
import { useDispatch } from "react-redux";

import { changeCategory } from "../redux/filter/slice";

import { useTranslatedCategories } from "../hooks";

type CategoriesProps = {
  value: number;
};

export const Categories = memo(({ value }: CategoriesProps) => {
  const categories = useTranslatedCategories();

  const dispatch = useDispatch();
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => dispatch(changeCategory(index))}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
