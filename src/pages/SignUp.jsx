import { Header } from "../components/Header";
import "./signUp.scss";

export const SignUp = () => {
  

  
  return (
    <div>
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        <form className="signup-form">
          <label>メールアドレス</label><br />
          <input type="email" className="email-input" /><br />
          <label>ユーザ名</label><br />
          <input type="text" className="name-input" /><br />
          <label>パスワード</label><br />
          <input type="password"  className="password-input" /><br />
          <button type="button" className="signup-button">作成</button>
        </form>
      </main>
    </div>
  )
}