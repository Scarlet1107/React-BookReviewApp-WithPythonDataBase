import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom"; // Add this line
import { signIn } from "../authSlice";
import { Header } from "../components/Header";
import { url } from "../const";
import "../index.css";

export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const emailRef = useRef();
  const passwordRef = useRef();

  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
        navigate("/signin");
      });
  };

  if (auth) return <Navigate to="/home" />;

  return (
    <div>
      <Header />
      <main>
        <h3 className="font-bold text-3xl m-8">サインイン</h3>
        <p className="error-message mb-8">{errorMessage}</p>
        <form>
          <label>メールアドレス</label>
          <br />
          <input
            ref={emailRef}
            type="email"
            className="input-box"
            onChange={handleEmailChange}
            onClick={() => emailRef.current.select()}
          />
          <br />
          <label>パスワード</label>
          <br />
          <input
            ref={passwordRef}
            type="password"
            className="input-box"
            onChange={handlePasswordChange}
            onClick={() => passwordRef.current.select()}
          />
          <br />
          <button
            type="button"
            className="button bg-blue-500 p-4"
            onClick={() => onSignIn()}
          >
            サインイン
          </button>
        </form>
      </main>
    </div>
  );
};
