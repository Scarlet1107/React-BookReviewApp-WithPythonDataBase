import useSWR from "swr";
import { useCookies } from "react-cookie";
import { useState } from "react";
import React from "react";

// SWRを使用して、本の一覧を取得するコンポーネント
// Home.jsxで使用

const BookReviewList = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["token"]);
  const [page, setPage] = useState(0);

  async function fetcher(key) {
    const res = await fetch(key, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    return res.json();
  }

  const { data, error } = useSWR(
    `${apiUrl}/books?offset=${page * 10}`,
    fetcher
  );
  const isLastPage = data && data.length < 10;
  if (error) {
    console.log(error);
    return (
      <div className="text-red-500">
        Error : レビュー情報の取得に失敗しました
      </div>
    );
  } else if (!data) return <div className="text-8xl">Now loading...</div>;

  return (
    <div>
      <h1 className="text-5xl mt-12 mb-24">書籍レビュー 一覧</h1>
      <div className="grid grid-cols-5 gap-10 px-12">
        {data &&
          data.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center justify-center p-4 border rounded shadow h-24 transform transition duration-50 ease-in-out hover:scale-105 hover:shadow-lg overflow-hidden"
            >
              {/* 長過ぎるタイトルは”タイトル...”みたいに省略して書きたい */}
              <h2 className="text-xl">
                {book.title.length >= 25
                  ? book.title.slice(0, 25) + "..."
                  : book.title}
              </h2>
            </div>
          ))}
      </div>

      {/* ページネーション */}

      
      <div className="grid grid-cols-11 gap-4 text-xl mt-12">
        {page >= 3 && (
          <button className="col-start-3" onClick={() => setPage(0)}>
            最初のページ
          </button>
        )}

        {page > 0 && (
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))} // Ensure page doesn't go below 0
            className="col-start-5"
          >
            前のページ
          </button>
        )}
        <p className="col-start-6 font-bold">{page}</p>
        {!isLastPage && (
          <button onClick={() => setPage((old) => old + 1)}>次のページ</button>
        )}
      </div>
    </div>
  );
};

export default BookReviewList;
