import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MyOutlet from "./Pages/MyOutlet";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-slate-100">
    <Toaster />
      <Header />
      <MyOutlet />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
