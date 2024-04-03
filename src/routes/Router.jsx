import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { WelcomePage } from "../pages/WelcomePage";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<WelcomePage />} />
        {auth ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
