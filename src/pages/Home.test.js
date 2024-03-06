import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "./Home";

describe("Home page", () => {
  test("contains nesessary components", () => {
    render(<Home />);
    expect(screen.getByText(/home/i)).toBeInTheDocument(); // homeというテキストが存在することを期待する
  });
});
