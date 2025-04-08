// src/Hooks/useCloudinary.js
import axios from "axios";

export function useCloudinary() {
  const uploadImage = async (selectFile, setCloudinaryImg, setTempUrl) => {
    console.log("Uploading to Cloudinary...");

    if (!selectFile) {
      console.warn("No file selected for upload.");
      return;
    }

    try {
      const cloud_name = "dsble6dtc";
      const formData = new FormData();
      formData.append("file", selectFile);
      formData.append("cloud_name", cloud_name);
      formData.append("upload_preset", "chatify");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      setCloudinaryImg(res.data.secure_url);
      setTempUrl(null); // Remove temp preview after upload
    } catch (err) {
      console.error("Error uploading image:", err.response?.data || err.message);
    }
  };

  return uploadImage;
}