import React from "react";
import { Header } from "../components/Header";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Profile = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["token"]);
  const [newUsername, setNewUsername] = useState("");
  const [userName, setUsername] = useState("");

  useEffect(() => {
    //get user name from apiUrl/users by using fetch
    const fetchUserName = async () => {
      try {
        const res = await fetch(`${apiUrl}/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        if (!res.ok) {
          // Handle error
          console.error("Failed to fetch user name");
          return;
        }
        const data = await res.json();
        setUsername(data.name);
      } catch (error) {
        console.error("Failed to fetch user name", error);
      }
    };
    fetchUserName();
  }, [apiUrl, cookies.token]);

  const handleEditProfile = async (newUsername) => {
    if (newUsername === "") return;
    const res = await fetch(`${apiUrl}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({ name: newUsername }),
    });
    if (!res.ok) {
      // Handle error
      console.error("Failed to update username");
      return;
    }
    alert("ユーザー名を変更しました");
    navigate("/home");
  };

  return (
    <>
      <Header />
      <h1 className="text-2xl font-medium text-center mt-10 ">
        ユーザーネームを変更
      </h1>
      <div className="flex justify-center mt-10">
        <input
          className="bg-gray-200 px-4 py-2 rounded w-50% mr-10"
          type="text"
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder={userName}
        />
        <button
          onClick={() => handleEditProfile(newUsername)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          名前を変える
        </button>
      </div>
    </>
  );
};
export default Profile;
