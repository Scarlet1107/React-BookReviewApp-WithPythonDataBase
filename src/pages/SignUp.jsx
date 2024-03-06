import axios from "axios";
import Compressor from "compressorjs";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../authSlice";
import { Header } from "../components/Header";
import { url } from "../const";
import "./signUp.scss";

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [icon, setIcon] = useState();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignUp = () => {
    const data = {
      email: email,
      name: name,
      password: password
    };

    //2024/3/6編集中
    const iconData = {
      icon: icon

    };

    axios.post(`${url}/users`, data)
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        navigate.push("/");
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      })

    if (auth) return <Navigate to="/" />
  }

  const handleIconChange = (e) => {
    const file = e.target.files[0];

    new Compressor(file, {
      quality: 0.6, //圧縮品質を0.6に設定
      success(result) {
        setIcon(result);　//圧縮後の状態を保存
      },
      error(err) {
        console.log(err);
      },
    });

    axios.post(`${url}/uploads`, icon,)
      .then((res) => {
        const iconUrl = res.data.url;
        setIcon(iconUrl);
      })
      .catch((err) => {
        console.log(err);
      })

  };

  return (
    <div>
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form">
          <label>メールアドレス</label><br />
          <input type="email" onChange={handleEmailChange} className="email-input" /><br />
          <label>ユーザ名</label><br />
          <input type="text" onChange={handleNameChange} className="name-input" /><br />
          <label>パスワード</label><br />
          <input type="password" onChange={handlePasswordChange} className="password-input" /><br />

          <p>アイコンをアップロード</p>
          <input type="file" onChange={handleIconChange} className="file-input" />

          <button type="button" onClick={onSignUp} className="signup-button">作成</button>
        </form>
      </main>
    </div>
  )
}