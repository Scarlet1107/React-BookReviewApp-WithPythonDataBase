import React from "react";
import { Header } from "../components/Header";

// このコンポーネントは、ヘッダーとフォームを表示するだけのものです
export const Home = () => {
    
    return (
        <div>
            <Header />
            <h1>Home</h1>
            <input className="test" id="input1" role="form"></input>
        </div>
    );
}

export default Home;