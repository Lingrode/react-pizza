import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { changePage, togglePages } from "../../redux/filter/slice";
import { selectCurrentPage } from "../../redux/filter/selectors";
import { selectIsDark } from "../../redux/theme/selector";
import { useAppDispatch } from "../../hooks";

import style from "./Pagination.module.scss";

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const isDark = useSelector(selectIsDark);
  const totalPages = Math.ceil(12 / 8);

  const paginate = (pageNum: number, event: any) => {
    event.preventDefault();
    dispatch(changePage(pageNum));
  };

  const handleTogglePage = (btn: string, event: any) => {
    event.preventDefault();
    dispatch(togglePages({ btn, maxPages: totalPages }));
  };

  return (
    <div className={style.container}>
      <ul className={`${style.pageList} ${isDark && style.dark}`}>
        <li
          className={`${style.prev} ${
            currentPage === 1 ? `${style.disabled}` : ""
          }`}
        >
          <a href="!#" onClick={(e) => handleTogglePage("prev", e)}>
            <MdKeyboardArrowLeft className={style.icon} />
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <li
            key={num}
            className={`${style.pageListItem} ${
              currentPage === num ? `${style.active}` : ""
            }`}
          >
            <a href="!#" onClick={(e) => paginate(num, e)}>
              {num}
            </a>
          </li>
        ))}
        <li
          className={`${style.next} ${
            currentPage === totalPages ? `${style.disabled}` : ""
          }`}
        >
          <a href="!#" onClick={(e) => handleTogglePage("next", e)}>
            <MdKeyboardArrowRight className={style.icon} />
          </a>
        </li>
      </ul>
    </div>
  );
};
