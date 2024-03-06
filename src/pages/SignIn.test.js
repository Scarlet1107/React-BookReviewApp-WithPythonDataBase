import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import SignIn from "./SignIn";

describe("SignIn page", () => {
  test("contains nesessary components", () => {
    render(<SignIn />);
    expect(screen.getByRole("button", { name: /ログイン/i })).toBeInTheDocument(); // ログインというテキストが存在することを期待する
  });
});
