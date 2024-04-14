import React from "react";
import { useState } from "react";

const Pagination = ({ data, page, setPage }) => {
  const isLastPage = data && data.length < 10;

  return (
    <div>
      {/* ページネーション */}

      <div className="grid grid-cols-11 gap-4 text-xl mt-12">
        {page >= 3 && (
          <button className="col-start-3" onClick={() => setPage(0)}>
            最初のページ
          </button>
        )}

        {page > 0 && (
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))} // Ensure page doesn't go below 1
            className="col-start-5"
          >
            前のページ
          </button>
        )}
        <p className="col-start-6 font-bold">{page + 1}</p>
        {!isLastPage && (
          <button onClick={() => setPage((old) => old + 1)}>次のページ</button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
