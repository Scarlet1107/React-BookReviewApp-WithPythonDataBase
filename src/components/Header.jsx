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
  if (error) {
    return <div className="text-red-500">Error : ユーザー情報の取得に失敗しました</div>;
  } else if (!data) { 
    return <div className="text-4xl p-8 bg-blue-400">Now loading...</div>;
  }

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/signin");
  };

  return (
    <header className="flex bg-blue-400">
      <h1 className="font-bold text-4xl p-8">書籍レビューアプリ</h1>
      <div className="flex justify-end py-2 px-4 m-8 text-xl">おかえりなさい！{data && data.name}さん</div>
      {/*もしURLがsigninまたはsignupなら下のsign-out-buttonを表示しない*/}
      {auth ? (
        location.pathname === "/signin" ? null : (
          <button className="button text-xl flex justify-end" onClick={handleSignOut}>
            サインアウト
          </button>
        )
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
    </header>
  );
};
