import React from "react";
import { Header } from "../components/Header";
import BookReviewList from "./BookReviewList";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="mt-12 mb-24 ">
        <h1 className="flex justify-center text-5xl">書籍レビュー 一覧</h1>
        <button
          className="mr-16 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded h-fit"
          onClick={() => {
            navigate("/new");
          }}
        >
          レビューを投稿する
        </button>
      </div>

      <BookReviewList />
    </div>
  );
};

export default Home;
