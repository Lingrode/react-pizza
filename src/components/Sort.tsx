import { useEffect, useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

import { changeOrder, changeSort } from "../redux/filter/slice";
import { SortItem } from "../redux/filter/types";
import { selectLang } from "../redux/lang/selectors";
import { useTranslatedSortItems } from "../hooks";

type SortProps = {
  value: SortItem;
  order: string;
};

export const Sort = memo(({ value, order }: SortProps) => {
  const { t, i18n } = useTranslation("home", { keyPrefix: "sort" });
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const currLang = useSelector(selectLang);

  const list = useTranslatedSortItems();

  const onSortClick = (item: SortItem) => {
    dispatch(changeSort(item));
    setIsOpen(false);
  };

  const onOrderChange = (value: string) => {
    dispatch(changeOrder(value));
  };

  useEffect(() => {
    if (!value.name) return;

    const translatedItem = list.find(
      (item) => item.sortProperty === value.sortProperty
    );

    if (translatedItem && value.name !== translatedItem.name) {
      dispatch(changeSort(translatedItem));
    }
  }, [currLang, i18n.language, list]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current))
        setIsOpen(false);
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>{t("label")}</b>
        <span onClick={() => setIsOpen(!isOpen)}>{value.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                key={index}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
                onClick={() => onSortClick(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="sort__order">
        <span
          onClick={() => onOrderChange("asc")}
          className={order === "asc" ? "active" : ""}
        >
          <FaArrowUpLong className="arrow" />
        </span>
        <span
          onClick={() => onOrderChange("desc")}
          className={order === "desc" ? "active" : ""}
        >
          <FaArrowDownLong className="arrow" />
        </span>
      </div>
    </div>
  );
});
