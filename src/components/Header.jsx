import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import SWR from "swr";
import "../index.css";

export const Header = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const apiUrl = process.env.REACT_APP_API_URL;

  async function fetcher(key) {
    const res = await fetch(key, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    return res.json();
  }

  const { data, error } = SWR(`${apiUrl}/users`, fetcher);
  if (auth) {
    if (error) {
      return (
        <div className="text-red-500">
          Error : ユーザー情報の取得に失敗しました
        </div>
      );
    } else if (!data) {
      return <div className="text-4xl p-8 bg-blue-400">Now loading...</div>;
    }
  }

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    alert("サインアウトしました");
    window.location.reload();
  };

  return (
    <header className="flex justify-around bg-blue-400">
      <h1
        className="justify-start font-bold text-4xl p-8 cursor-pointer"
        onClick={() => navigate("/")}
      >
        書籍レビューアプリ
      </h1>
      <div className="flex">
        {auth && (
          <div className="py-2 px-4 m-8 text-xl ">
            おかえりなさい！
            <span className="font-bold"> {data && data.name} </span>さん
          </div>
        )}
        {/*ウェルカムページ、、ログインページ、ログイン後のページのそれぞれに対応するヘッダーを表示*/}
        {auth ? (
          location.pathname === "/signin" ? null : (
            <button className="button text-xl" onClick={handleSignOut}>
              サインアウト
            </button>
          )
        ) : location.pathname === "/" ? (
          <div className="flex">
            <div className="py-2 px-4 m-8 text-xl">現在<span className="font-bold"> ゲスト </span>として参加しています</div>
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="button text-xl"
            >
              サインイン
            </button>
          </div>
        ) : location.pathname === "/signin" ? (
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="button text-xl"
          >
            アカウントを新規作成
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="button text-xl"
          >
            アカウントをお持ちの方
          </button>
        )}
      </div>
    </header>
  );
};
