import axios from "axios";
import Compressor from "compressorjs";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../authSlice";
import { Header } from "../components/Header";
import { url } from "../const";

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState();
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleIconChange = (e) => {
    setIcon(e.target.files[0]);
  };

  useEffect(() => {
    if (auth) {
      console.log("正常にサインアップしました");
      navigate("/");
    } else {
      console.log("authがfalseです");
    }
  }, [auth]);

  const onSignUp = async () => {
    //ここでemail, name, passwordのバリデーションを行う
    if (email === "") {
      setErrorMessge("メールアドレスを入力してください");
      return;
    }
    if (validateEmail(email) === false) {
      setErrorMessge("メールアドレスの形式が正しくありません");
      return;
    }
    if (name === "") {
      setErrorMessge("ユーザ名を入力してください");
      return;
    }
    if (password === "") {
      setErrorMessge("パスワードを入力してください");
      return;
    }
    if (icon === undefined) {
      setErrorMessge("アイコンを選択してください");
      return;
    }
    console.log("バリデーションチェック完了");
    const data = {
      email: email,
      name: name,
      password: password,
    };

    await axios
      .post(`${url}/users`, data)
      .then(async (res) => {
        const token = res.data.token;
        console.log("アカウント作成に成功しました");
        console.log("token is " + token);
        dispatch(signIn());
        setCookie("token", token);
        await uploadIcon(token);
        console.log("アイコンのアップロードが完了しました");
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });

    if (auth) {
      console.log("正常にサインアップしました");
      navigate("/");
    } else {
      setErrorMessge("サインアップに失敗しました");
      console.log("authがfalseです");
      return;
    }
  };

  //メールアドレスのバリデーションチェックを行う関数
  const validateEmail = (email) => {
    console.log("validateEmail関数が呼ばれました");
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  //画像のアップロードを処理
  const uploadIcon = async (token) => {
    const formData = new FormData();

    //画像を圧縮
    const compressedIcon = await new Promise((resolve, reject) => {
      new Compressor(icon, {
        quality: 0.6, //圧縮品質を0.6に設定
        success(result) {
          resolve(result); //圧縮後の状態を"icon"に保存
        },
        error(err) {
          reject(err);
        },
      });
    });

    formData.append("icon", compressedIcon);
    console.log("画像の圧縮が完了しました");

    try {
      console.log("token ID " + token + "を使用して画像をアップロードします");
      const response = await axios({
        method: "post",
        url: `${url}/uploads`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log("画像のアップロードに失敗しました");
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <main className="w-500">
        <h2 className="text-3xl m-8">新規作成</h2>
        <p className="error-message mb-8">{errorMessage}</p>
        <form>
          <label className="m-8">メールアドレス</label>
          <br />
          <input
            type="email"
            onChange={handleEmailChange}
            className="input-box"
          />
          <br />
          <label>ユーザ名</label>
          <br />
          <input
            type="text"
            onChange={handleNameChange}
            className="input-box"
          />
          <br />
          <label className="">パスワード</label>
          <br />
          <input
            type="password"
            onChange={handlePasswordChange}
            className="input-box"
          />
          <br />
          <p className="mt-4 mb-2 ">アイコンをアップロード</p>
          <input
            type="file"
            onChange={handleIconChange}
            className="file-input"
          />{" "}
          <button
            type="button"
            onClick={onSignUp}
            className="button bg-blue-500 px-8 py-4"
          >
            作成
          </button>
        </form> 
      </main>
    </div>  
  ); 
};
