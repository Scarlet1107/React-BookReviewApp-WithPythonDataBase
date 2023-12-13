import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";

export const Router = () => {

  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to = "/" />} />
      <Route path="SignUp" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
  );
};

export default Router;