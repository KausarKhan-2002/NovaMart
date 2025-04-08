import { useEffect, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import Spinner from "../../Shared/Spinner";
import { getMaxiAllowedDOB } from "../../Helpers/getMaxAllowedDOB";

function SignupStep2({
  userInfo,
  setUserInfo,
  showPassword,
  setShowPassword,
  setStep,
  handleSubmit,
  loading,
}) {
  const [gender, setGender] = useState("");
  const handleChange = (e) => {
    setUserInfo((info) => ({ ...info, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setUserInfo((info) => ({ ...info, gender }));
  }, [gender]);

  return (
    <>
      <div className="relative flex flex-col">
        <input
          type={showPassword}
          value={userInfo.password}
          onChange={handleChange}
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl bg-slate-200/50 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none backdrop-blur-md"
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
      <div className="relative flex flex-col">
        <input
          type="password"
          value={userInfo.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 rounded-xl bg-slate-200/50 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none backdrop-blur-md"
        />
      </div>
      <div className="relative flex flex-col gap-4">
        <select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-200/50 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none backdrop-blur-md text-gray-700"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>

        <input
          type="date"
          name="DOB"
          value={userInfo.dob || ""}
          onChange={handleChange}
          max={getMaxiAllowedDOB()}
          className="w-full px-4 py-3 rounded-xl bg-slate-200/50 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none backdrop-blur-md text-gray-700"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-all shadow-md cursor-pointer"
        >
          Back
        </button>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="flex items-center gap-2  px-6 py-2 text-lg font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-md cursor-pointer"
          >
            {loading && <Spinner activity="spin" />} Sign
            Up
          </button>
        </div>
      </div>
    </>
  );
}

export default SignupStep2;