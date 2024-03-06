import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import "./header.scss";

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
    <header className="header">
      <h1>書籍レビューアプリ</h1>
      {/*もしURLがsigninまたはsignupなら下のsign-out-buttonを表示しない*/}
      {auth ? (
        <button className="sign-out-button" onClick={handleSignOut}>
          サインアウト
        </button>
      ) : (
        (location.pathname === "/signin") ? 
        <button type="button" onClick={() => navigate("/signup")} className="switch-button">アカウントを新規作成</button> : 
          <button type="button" onClick={() => navigate("/signin")} className="switch-button">サインイン</button>
      )}
    </header>
  );
};
