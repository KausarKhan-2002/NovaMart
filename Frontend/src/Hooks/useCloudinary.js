// src/Hooks/useCloudinary.js
import axios from "axios";

export const useCloudinary = () => {
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
      console.error(
        "Error uploading image:",
        err.response?.data || err.message
      );
    }
  };

  return uploadImage;
};

export const useMultipleCloudinaries = () => {
  return async (files, setImageArr) => {
    console.log(files);
    if (!files || files.length === 0) {
      console.warn("No files provided for upload.");
      return;
    }

    const cloud_name = "dsble6dtc";
    const upload_preset = "chatify";
    

    try {
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("cloud_name", cloud_name);
        formData.append("upload_preset", upload_preset);

        return axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
      });

      const response = await Promise.all(uploadPromises);
      const uploadedUrls = response.map((res) => ({
        url: res.data.secure_url,
        public_id: res.data.public_id,
      }));
      // setImageArr(uploadedUrls);
      return uploadedUrls
    } catch (err) {
      console.error(
        err.response?.data || err.message
      );
    }
  };
};
