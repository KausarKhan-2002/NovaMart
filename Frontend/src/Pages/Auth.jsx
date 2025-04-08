// src/Pages/Auth.js
import React, { useEffect, useState } from "react";
import { DEFAULT_PROFILE } from "../Utils/constants";
import { FaPenFancy } from "react-icons/fa";
import SignupStep1 from "../Components/Author/SignupStep1";
import SignupStep2 from "../Components/Author/SignupStep2";
import Login from "../Components/Author/Login";
import { useCloudinary } from "../Hooks/useCloudinary";
import CropperImage from "../Components/Author/CropperImage";
import { useValidator } from "../Hooks/useValidator";
import { useAuth } from "../Hooks/useAuth";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [tempUrl, setTempUrl] = useState(null);
  const [selectFile, setSelectFile] = useState(null);
  const [step, setStep] = useState(1);
  const [cloudinaryImg, setCloudinaryImg] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    DOB: "",
    cloudinaryImage: "",
  });
  // console.log(userInfo);

  const cloudinary = useCloudinary();
  const validate = useValidator();
  const auth = useAuth();

  useEffect(() => {
    if (cloudinaryImg) {
      setUserInfo((prev) => ({ ...prev, cloudinaryImage: cloudinaryImg }));
    }
  }, [cloudinaryImg]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      if (validate(userInfo, "all")) return;
    } else {
      if (validate(userInfo, "login")) return;
    }

    const cloud = () => {
      // Upload to Cloudinary
      if (isSignup) {
        cloudinary(selectFile, setCloudinaryImg, setTempUrl);
      }
    };
    cloud();

    auth(isSignup, setIsSignup, userInfo, setUserInfo, setLoading);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setTempUrl(url);
    setShowCropper(true);
  };

  return (
    <div className="flex min-h-[91.5vh] items-center justify-center px-4">
      <div className="w-full max-w-sm p-6 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl overflow-hidden">
        <h2 className="text-3xl font-extrabold text-center text-slate-700">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        {isSignup && step === 1 && (
          <div className="relative flex justify-center mt-4">
            <img
              src={cloudinaryImg || tempUrl || DEFAULT_PROFILE}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              alt="Profile"
            />
            <label className="absolute bottom-2 right-25 bg-black hover:bg-gray-900 hover:scale-105 transition text-white flex items-center justify-center w-7 h-7 rounded-full cursor-pointer">
              <input type="file" onChange={handleFile} className="hidden" />
              <FaPenFancy />
            </label>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {isSignup && step === 1 && (
            <SignupStep1
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setStep={setStep}
            />
          )}

          {isSignup && step === 2 && (
            <SignupStep2
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              setStep={setStep}
              handleSubmit={handleSubmit}
              selectFile={selectFile}
              loading={loading}
            />
          )}

          {!isSignup && (
            <Login
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </div>

        <p className="mt-6 text-center text-sm text-slate-800">
          {isSignup ? "Already have an account?" : "New here?"}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setStep(1);
            }}
            className="ml-2 text-blue-700 cursor-pointer hover:underline hover:text-blue-800 transition-all"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </span>
        </p>
      </div>

      {showCropper && (
        <CropperImage
          imageSrc={tempUrl}
          setShowCropper={setShowCropper}
          onCancel={() => setTempUrl(null)}
          onCrop={(croppedBlob) => {
            const croppedUrl = URL.createObjectURL(croppedBlob);
            setTempUrl(croppedUrl);
            setSelectFile(croppedBlob);
          }}
        />
      )}
    </div>
  );
}

export default Auth;
