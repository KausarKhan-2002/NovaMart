import React, { useEffect} from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MyOutlet from "./Pages/MyOutlet";
import { Toaster } from "react-hot-toast";
import { useProfile } from "./Hooks/useProfile";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OWN_PROTOTYPE_METHODS } from "./Helpers/myPrototype";
import NetworkStatus from "./Shared/NetworkStatus";

function App() {
  const user = useSelector((store) => store.user);

  const profile = useProfile();

  useEffect(() => {
    profile();

    // To enhance and use own methods attached in prototype
    OWN_PROTOTYPE_METHODS();
  }, []);

  return (
    <div className="bg-slate-100/40 py-2">
      <NetworkStatus />
      <Toaster />
      <ToastContainer />
      <Header />
      <MyOutlet />
      {/* <Footer /> */}
    </div>
  );
}

export default App;