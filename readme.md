<div align="center">
  <h1>🛍️ novaMart</h1>
  <p><strong>MERN Stack E-Commerce Platform</strong> with Cloudinary Image Uploads and Profile Image Cropper</p>
  <br/>

  <!-- Tech Stack Badges -->
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black"/>
  <img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-FF9900?logo=cloudinary&logoColor=white"/>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white"/>
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white"/>

  <br/><br/>
  <img src="https://via.placeholder.com/800x400?text=novaMart+Demo" width="80%" alt="novaMart demo banner"/>
</div>

---

## 🚀 Project Overview

**novaMart** is a full-stack e-commerce web application built with the **MERN stack**. It features a modern user interface, product management, and a unique **image upload flow using Cloudinary directly from the frontend**, optimized for performance and user experience.

It now also includes **profile image cropping** before upload for a smoother user experience during signup.

---

## 🧠 Key Features

- 🛒 Modern UI with React and Tailwind CSS
- 👤 Signup/Login flow with profile image upload and cropping
- 📤 Direct frontend Cloudinary uploads using custom hook
- 🖼️ Image cropping via `react-cropper` before upload
- 🔗 Image URL stored in MongoDB via backend API
- 📦 Full product CRUD operations
- 🔔 Real-time toast notifications
- 🔐 Clean separation of frontend and backend logic

---

## 🔄 Image Upload Workflow

<div align="center">
  <img src="https://i.imgur.com/JqQ6oY7.png" alt="Cloudinary Upload Flow" width="60%"/>
  <p><em>1. Upload (and Crop) from React → 2. Cloudinary returns URL → 3. URL stored in MongoDB</em></p>
</div>

---

## 🖥️ Frontend

Built with **React** and enhanced with:

- ✅ Signup/Login pages with profile image preview and cropper
- ✅ Cloudinary uploads using custom `useCloudinary` hook
- ✅ Drag-and-drop product image upload support (optional)
- ✅ Responsive layout and mobile-friendly
- ✅ Sends only URLs to backend (no file storage on backend)

This project focuses on simplicity, modern UX, and clean API interactions between the frontend and backend.

---

## 🧠 Why This Project?

- To demonstrate real-world MERN integration.
- To showcase image handling from the frontend using Cloudinary.
- To keep the backend lightweight with URL-based image references.
- To highlight production-level workflows using industry-relevant tools.

---

<details>
  <summary>📦 Install Frontend Dependencies</summary>

  ```bash
  cd frontend
  npm install react-cropper cropperjs axios
  ```

  Also ensure `react-icons`, `tailwindcss`, and `react-router-dom` are installed.

</details>