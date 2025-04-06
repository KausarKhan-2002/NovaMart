import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

// 17:45

function MyOutlet() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default MyOutlet;