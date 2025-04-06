import React from "react";
import Header from "./Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import MyOutlet from "./Pages/MyOutlet";

function App() {
  return (
    <div>
      <Header />
      <MyOutlet />
      <Footer />
    </div>
  );
}

export default App;
