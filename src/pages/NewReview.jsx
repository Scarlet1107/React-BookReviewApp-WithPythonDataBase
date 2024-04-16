import React from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const NewReview = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [bookName, setBookName] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [url, setUrl] = useState("test");
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleBookNameChange = (e) => {
    setBookName(e);
  };

  const handleDetailsChange = (e) => {
    setDetail(e);
  };

  const handleReviewChange = (e) => {
    setReview(e);
  };

  const handleSubmit = async () => {
    console.log("cookies.token = ", cookies.token);
    if (bookName === "") {
      alert("書籍名を入力してください");
      return;
    }
    if (detail === "") {
      alert("詳細を入力してください");
      return;
    }
    if (review === "") {
      alert("レビューを入力してください");
      return;
    }
    const res = await fetch(`${apiUrl}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({
        title: bookName,
        url: url,
        detail: detail,
        review: review,
      }),
    });
    if (!res.ok) {
      // Handle error
      console.error("Failed to post new review");
      return;
    }
    alert("レビューを投稿しました");
    navigate("/home");
  };

  return (
    <>
      <Header />
      <div className="mt-8 flex h-dvh">
        <div className="flex flex-col items-center space-y-6 w-2/3">
          <input
            className="bg-gray-200 px-4 py-2 rounded w-1/3"
            type="text"
            onChange={(e) => handleBookNameChange(e.target.value)}
            placeholder="書籍名"
          />
          <textarea
            className="bg-gray-200 px-4 py-2 rounded w-2/3 h-1/4 resize-none"
            type="text"
            onChange={(e) => handleDetailsChange(e.target.value)}
            placeholder="詳細"
          />
          <textarea
            className="bg-gray-200 px-4 py-2 rounded w-2/3 h-1/4 resize-none"
            type="text"
            onChange={(e) => handleReviewChange(e.target.value)}
            placeholder="レビュー"
          />
        </div>
        <div className="w-1/3">
          <button
            className=" mr-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded"
            onClick={() => handleSubmit()}
          >
            ポストする！
          </button>
        </div>
      </div>
    </>
  );
};

export default NewReview;
