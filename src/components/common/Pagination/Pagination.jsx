import React, { useState } from "react";
import style from "./Pagination.module.css";

const Pagination = (props) => {
  const pageCount = Math.ceil(props.totalItemsCount / props.pageSize);
  const pages = [];

  // (текущая страница - 1) * размер страницы + 1
  const portionCount = Math.ceil(pageCount / props.portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
  const rigthPortionPageNumber = portionNumber * props.portionSize;

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  return (
    <div className={style.pageNav}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>{"❮"}</button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rigthPortionPageNumber)
        .map((p) => {
          return (
            <span
              className={props.currentPage === p && style.pageNavActive}
              onClick={() => props.onPageChanged(p)}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>{"❯"}</button>
      )}
    </div>
  );
};

export default Pagination;
