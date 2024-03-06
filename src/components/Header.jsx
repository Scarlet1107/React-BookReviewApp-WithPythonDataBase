import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import "./header.scss";

export const Header = () => {

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

      <button className="sign-out-button" onClick={handleSignOut}>
        サインアウト
      </button>

    </header>
  );
};
