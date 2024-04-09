import React from "react";
import { Header } from "../components/Header";
import BookReviewList from "./BookReviewList";
import Pagination from "./Pagination";

export const Home = () => {
  return (
    <div>
      <Header />
      <BookReviewList />
    </div>
  );
};

export default Home;
