import { memo } from "react";
import { useDispatch } from "react-redux";
import { changeCategory } from "../redux/filter/slice";

type CategoriesProps = {
  value: number;
};

const Categories = memo(({ value }: CategoriesProps) => {
  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];
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

export default Categories;
