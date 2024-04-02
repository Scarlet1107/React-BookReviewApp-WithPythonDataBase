import React from "react";
import { Header } from "../components/Header";
import BookReviewList from "./BookReviewList";

export const Home = () => {
  return (
    <div>
      <Header />
      <h1 className="text-5xl mt-12 mb-24">書籍レビュー 一覧</h1>
      <BookReviewList />
    </div>
  );
};

export default Home;
