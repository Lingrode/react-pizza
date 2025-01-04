import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import style from "./Pagination.module.scss";

const Pagination = ({ currentPage, setCurrentPage }) => {
  const pagesNumbers = [];

  for (let i = 1; i <= Math.ceil(12 / 4); i++) pagesNumbers.push(i);

  const paginate = (pageNum, event) => {
    event.preventDefault();
    setCurrentPage(pageNum);
  };

  const togglePage = (btn, event) => {
    event.preventDefault();
    if (btn === "prev") setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    if (btn === "next")
      setCurrentPage((prev) => (prev < pagesNumbers.length ? prev + 1 : prev));
  };

  return (
    <div className={style.container}>
      <ul className={style.pageList}>
        <li
          className={`${style.prev} ${
            currentPage === 1 ? `${style.disabled}` : ""
          }`}
        >
          <a href="!#" onClick={(e) => togglePage("prev", e)}>
            <MdKeyboardArrowLeft className={style.icon} />
          </a>
        </li>
        {pagesNumbers.map((num) => (
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
            currentPage === pagesNumbers.length ? `${style.disabled}` : ""
          }`}
        >
          <a href="!#" onClick={(e) => togglePage("next", e)}>
            <MdKeyboardArrowRight className={style.icon} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
