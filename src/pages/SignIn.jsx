import React from "react";
import { Header } from "../components/Header";
import "./signin.css";


export const SignIn = () => {

  return (
    <div>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <button>ログイン</button>
        <input >mail</input>
        <p id="email_errormessage">error message</p>
      </main>
    </div>
  )
}