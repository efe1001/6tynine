import React from "react";
import { Button } from "evergreen-ui";
import "./styles/Pagination.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <Button
            key={index}
            intent="success"
            margin={3}
            onClick={() => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
             className={page == currentPage ? "active" : ""}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default Pagination;
