import React from "react";
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["token"]);

  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [apiUrl, id, cookies.token]);

  return (
    <div>
      <Header />
      {data ? (
        <h2>この書籍のタイトルは {data.title} です</h2>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditReview;
