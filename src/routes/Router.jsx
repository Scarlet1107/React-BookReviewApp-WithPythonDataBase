import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { WelcomePage } from "../pages/WelcomePage";
import { Profile } from "../pages/Profile";
import { NewReview } from "../pages/NewReview";
import { ReviewDetail } from "../pages/ReviewDetail";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const { id } = useParams();

  return (
    <BrowserRouter>
      <Routes>
        {auth ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new" element={<NewReview />} />
            <Route path="/detail/:id" element={<ReviewDetail />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<WelcomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
