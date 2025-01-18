import { useSelector, useDispatch } from "react-redux";
import {
  changePage,
  selectCurrentPage,
  togglePages,
} from "../../redux/slices/filterSlice";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import style from "./Pagination.module.scss";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
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
      <ul className={style.pageList}>
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
              currentPage === num ? "active" : ""
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

export default Pagination;
