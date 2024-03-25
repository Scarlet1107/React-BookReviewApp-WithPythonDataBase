import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import "../index.css";

export const Header = () => {

  const location = useLocation();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();



  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/signin");
  };


  return (
    <header className="flex justify-around bg-blue-400">
      <h1 className="font-bold text-4xl p-8 mr-32">書籍レビューアプリ</h1>
      {/*もしURLがsigninまたはsignupなら下のsign-out-buttonを表示しない*/}
      {auth ? (
        location.pathname === "/signin" ? null :
        <button className="button ml-32 text-xl" onClick={handleSignOut}>
          サインアウト
        </button>
      ) : (
        location.pathname === "/signin" ? 
        <button type="button" onClick={() => navigate("/signup")} className="button ml-32 text-xl">アカウントを新規作成</button> : 
          <button type="button" onClick={() => navigate("/signin")} className="button ml-32 text-xl">アカウントをお持ちの方</button>
      )}
    </header>  
  );
};
