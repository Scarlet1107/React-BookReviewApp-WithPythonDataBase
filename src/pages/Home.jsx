import React from "react";
import { Header } from "../components/Header";
export const Home = () => {
    
    return (
        <div>
            <Header />
            <h1 className="text-6xl m-8">Home</h1>
            <h2 className="text-4xl m-8">ここに書籍レビューの一覧を表示する</h2>
        </div>
    );
}

export default Home;