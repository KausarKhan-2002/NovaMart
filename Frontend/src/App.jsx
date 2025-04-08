import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MyOutlet from "./Pages/MyOutlet";
import { Toaster } from "react-hot-toast";
import { useProfile } from "./Hooks/useProfile";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((store) => store.user);
  console.log(user);

  const profile = useProfile();

  useEffect(() => {
    profile();
  }, []);

  // if (!user) return;

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
