import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
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
  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });     
  };

  if (auth) return <Navigate to="/" />;

  return ( 
    <div>

      <Header />
      <main>
        <h3 className="font-bold text-3xl m-8">サインイン</h3>
        <p className="error-message mb-8">{errorMessage}</p>
        <form className="">
          <label className="">メールアドレス</label>
          <br />
          <input
            type="email"
            className="input-box"
            onChange={handleEmailChange}
          />
          <br />
          <label className="">パスワード</label>
          <br />
          <input
            type="password"
            className="input-box"
            onChange={handlePasswordChange}
          />
          <br />  
          <button type="button" className="button bg-blue-500 p-4" onClick={onSignIn}>
            サインイン  
          </button>   
        </form>   
      </main>
    </div>   
  );
};
