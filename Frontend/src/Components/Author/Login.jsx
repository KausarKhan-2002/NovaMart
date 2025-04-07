import { BiShow, BiHide } from "react-icons/bi";
import Spinner from "../../Shared/Spinner";

function Login({
  userInfo,
  setUserInfo,
  showPassword,
  setShowPassword,
  handleSubmit,
  loading
}) {
  const handleChange = (e) => {
    setUserInfo((info) => ({ ...info, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="relative flex flex-col">
        <input
          type="email"
          value={userInfo.email}
          onChange={handleChange}
          name="email"
          placeholder="Email"
          className="w-full px-4 rounded-xl py-3  placeholder-gray-400 bg-slate-200/50  focus:ring-2 focus:ring-blue-300 focus:outline-none backdrop-blur-md"
        />
      </div>
      <div className="relative flex flex-col">
        <input
          type={showPassword}
          value={userInfo.password}
          onChange={handleChange}
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl bg-slate-200/50  placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none backdrop-blur-md"
        />
        <p
          className="absolute top-3 right-3 text-2xl text-slate-600 cursor-pointer"
          onClick={() =>
            setShowPassword(showPassword === "password" ? "text" : "password")
          }
        >
          {showPassword === "password" ? <BiShow /> : <BiHide />}
        </p>
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        
        className="flex items-center justify-center gap-3 w-full py-3 mt-2 text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:to-lime-500 rounded-xl transition-all shadow-lg hover:shadow-2xl cursor-pointer"
      >
        {loading && <Spinner activity="spin" />} Log In
      </button>
    </>
  );
}

export default Login;
