import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";

function MyOutlet() {
  return (
    <div className="pt-15">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default MyOutlet;
