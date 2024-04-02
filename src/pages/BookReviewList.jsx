import useSWR from "swr";
import { useCookies } from "react-cookie";
import { useState } from "react";
import React from "react";

// SWRを使用して、本の一覧を取得するコンポーネント
// Home.jsxで使用

const BookReviewList = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["token"]);
  const [page, setPage] = useState(1);

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
      {/* 書籍レビュー一覧 */}
      <div className="grid grid-cols-5 gap-10 px-12">
        {data &&
          data.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center justify-center p-4 border rounded shadow h-24 transform transition duration-50 ease-in-out hover:scale-105 hover:shadow-lg overflow-hidden"
            >
              {/* 長過ぎるタイトルは”タイトル...”みたいに省略して書きたい */}
              <h2 className="text-xl text-overflow-ellipsis">
                {book.title.substring(0, 20)}
              </h2>
              <p>{book.author}</p>
            </div>
          ))}
      </div>

      {/* ページネーション */}

      <div className="grid grid-cols-11 gap-4 text-xl mt-12">
        {page >= 3 && (
          <button className="col-start-3" onClick={() => setPage(1)}>
            最初のページ
          </button>
        )}

        {page > 1 && (
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))} // Ensure page doesn't go below 1
            className="col-start-5"
          >
            前のページ
          </button>
        )}
        <p className="col-start-6 font-bold">{page}</p> 
        <button onClick={() => setPage((old) => old + 1)}>次のページ</button>
      </div>
    </div>
  );
};

export default BookReviewList;
