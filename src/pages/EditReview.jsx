import React from "react";
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export const EditReview = () => {
  const [bookName, setBookName] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["token"]);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setInitialData(data))
      .catch((error) => console.error(error));
  }, [apiUrl, id, cookies.token]);

  const setInitialData = (data) => {
    setData(data);
    setBookName(data.title);
    setDetail(data.detail);
    setUrl(data.url);
    setReview(data.review);
  };

  const handleBookNameChange = (e) => {
    setBookName(e);
  };

  const handleDetailsChange = (e) => {
    setDetail(e);
  };

  const handleReviewChange = (e) => {
    setReview(e);
  };

  const handleUrlChange = (e) => {
    setUrl(e);
  };

  const handleSubmit = async () => {
    fetch(`${apiUrl}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({
        title: bookName,
        detail: detail,
        review: review,
        url: url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = async () => {
    try {
      await fetch(`${apiUrl}/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      alert("削除しました");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      {data ? (
        <div>
          <div className="mt-8 flex h-dvh justify-start">
            <div className="flex flex-col items-start space-y-6 w-2/3 ml-10">
              <input
                className="bg-gray-200 px-4 py-2 rounded w-1/3"
                type="text"
                onChange={(e) => handleBookNameChange(e.target.value)}
                placeholder="書籍名"
                defaultValue={data.title}
              />
              <textarea
                className="bg-gray-200 px-4 py-2 rounded w-2/3 h-1/4 resize-none"
                type="text"
                onChange={(e) => handleDetailsChange(e.target.value)}
                placeholder="詳細"
                defaultValue={data.detail}
              />
              <textarea
                className="bg-gray-200 px-4 py-2 rounded w-2/3 h-1/4 resize-none"
                type="text"
                onChange={(e) => handleReviewChange(e.target.value)}
                placeholder="レビュー"
                defaultValue={data.review}
              />
              <input
                className="bg-gray-200 px-4 py-2 rounded w-1/3"
                type="text"
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="URL"
                defaultValue={data.url}
              />
            </div>
            <div className="w-1/3 flex flex-col space-y-20">
              <button
                className="mr-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded w-2/5 mt-12"
                onClick={() => handleSubmit()}
              >
                編集を保存する
              </button>
              <button
                className="mr-auto bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded w-2/5"
                onClick={() => {
                  if (window.confirm("本当にレビューを削除しますか？")) {
                    handleDelete();
                  }
                }}
              >
                レビューを削除する
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default EditReview;
