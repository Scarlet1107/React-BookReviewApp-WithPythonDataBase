import React from "react";
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const ReviewDetail = () => {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const fetcher = async (key) => {
    const response = await fetch(key, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return response.json();
  };
  const { data, error, isLoading } = useSWR(`${apiUrl}/books/${id}`, fetcher);

  return (
    <div>
      <Header />
      {isLoading && <p className="text-3xl mt-10">Loading...</p>}
      <div className="text-red-600">
        {error && <p>Error: {error.message}</p>}
      </div>
      <div className="mt-10">
        {data && (
          <div className="flex">
            <section className="w-2/3 flex flex-col items-center">
              <div className="p-8">
                <p className="text-3xl px-4 py-2 font-medium w-max">
                  {data.title}
                </p>
              </div>
              <div className="flex flex-col p-8 items-center w-1/2">
                <p className="font-medium text-2xl">詳細</p>
                <p className="text-wrap border-solid border-2 rounded p-2 mt-4">
                  {data.detail}
                </p>
              </div>
              <div className="flex flex-col p-8 items-center w-1/2">
                <p className="font-medium text-2xl mr-8 ">レビュー</p>
                <p className="text-wrap border-solid border-2 rounded w-1/2 p-2 mt-4">
                  {data.review}
                </p>
              </div>
            </section>
            <section className="w-1/3 mt-10">
              <a
                title="外部リンクに移動します"
                href={data.url}
                rel="noopener noreferrer"
                target="_blank"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-2"
              >
                実際に読んでみる
              </a>
              {data.isMine ? (
                <div>
                  <p className="mt-32">このレビューはあなたが書いたものです</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-2"
                    onClick={() => navigate(`/edit/${id}`)}
                  >
                    クリックして編集
                  </button>
                </div>
              ) : (
                <p className="mt-32">
                  このレビューは{" "}
                  <span className="font-bold"> {data.reviewer} </span>{" "}
                  さんによって書かれました
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
