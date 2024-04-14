import React from "react";
import "../index.css";
import { Header } from "../components/Header";
import { useState } from "react";
import SWR from "swr";
import Pagination from "./Pagination";

export const WelcomePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [page, setPage] = useState(0);  

  async function fetcher(key) {
    const res = await fetch(key);
    return res.json();
  }

  const { data, error } = SWR(
    `${apiUrl}/public/books?offset=${page * 10}`,
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
    <>
      <Header />
      {/* 書籍レビュー一覧 */}

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
                  <Pagination data={data} page ={page} setPage={setPage} />
    </>
  );
};
