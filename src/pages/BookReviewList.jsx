import React from "react";
import useSWR from "swr";
import { useCookies } from "react-cookie";

const BookReviewList = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["token"]);

  async function fetcher(key) {
    const res = await fetch(key, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    return res.json();
  }

  const { data, error } = useSWR(`${apiUrl}/books`, fetcher);
  if (error) {
    console.log(error);
    return (
      <div className="text-red-500">
        Error : レビュー情報の取得に失敗しました
      </div>
    );
  } else if (!data) return <div>Now loading...</div>;


    return (
        <div className="grid grid-cols-5 gap-10 px-12">
          {data &&
            data.map((book) => (
              <div key={book.id} className="p-4 border rounded shadow">
                <h2 className="text-xl">{book.title}</h2>
                <p>{book.author}</p>
              </div>
            ))}
        </div>
      );

};

export default BookReviewList;
