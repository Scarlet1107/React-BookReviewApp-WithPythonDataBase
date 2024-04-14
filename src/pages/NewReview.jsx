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
  const [url, setUrl] = useState("");
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBookName(e);
  };

  const handleSubmit = async () => {
    console.log("cookies.token = ", cookies.token);
    if (bookName === "") {
      alert("書籍名を入力してください");
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
      <div className="mt-8">
        <input
          className="bg-gray-200 px-4 py-2 rounded w-50% mr-10"
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="書籍名"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded"
          onClick={() => handleSubmit()}
        >
          ポストする！
        </button>
      </div>
    </>
  );
};

export default NewReview;
