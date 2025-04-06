<div align="center">
  <h1>🛍️ novaMart</h1>
  <p><em>MERN e-commerce with frontend Cloudinary uploads</em></p>

  <!-- Badges -->
  <p>
    <img alt="React" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black"/>
    <img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-FF9900?logo=cloudinary&logoColor=white"/>
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white"/>
    <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white"/>
  </p>
  <img src="https://via.placeholder.com/800x400?text=Demo+with+Cloudinary+Upload" width="80%"/>
</div>

<!-- Key Workflow -->
<h2 align="center">🔄 Image Flow</h2>
<div align="center">
  <img src="https://i.imgur.com/JqQ6oY7.png" alt="Frontend Cloudinary Flow" width="60%"/>
  <p><em>1. Frontend upload → 2. Cloudinary returns URL → 3. Store URL in MongoDB</em></p>
</div>

<!-- Frontend-Backend Split -->
<table width="100%">
  <tr>
    <!-- Frontend -->
    <td width="50%" valign="top">
      <h2 align="center">🖥️ Frontend</h2>
      <ul>
        <li><b>Cloudinary React Widget</b> for uploads</li>
        <li>Drag-and-drop image interface</li>
        <li>Auto-optimizes images before upload</li>
        <li>Sends Cloudinary URL to backend API</li>
        <li>Toast notifications for upload status</li>
      </ul>
      <details>
        <summary>📁 Frontend Packages</summary>
        <pre>npm install @cloudinary/react @cloudinary/url-gen react-dropzone</pre>
      </details>
    </td>
    
    <!-- Backend -->
    <td width="50%" valign="top">
      <h2 align="center">⚙️ Backend</h2>
      <ul>
        <li><b>No Cloudinary SDK</b> - pure URL storage</li>
        <li>Receives image URLs via API</li>
        <li>Stores URLs in MongoDB (no file handling)</li>
        <li>Standard CRUD for product data</li>
      </ul>
    </td>
  </tr>
</table>

<!-- Setup Guide -->
<h2 align="center">🚀 Setup</h2>

```bash
# Frontend (with Cloudinary)
cd frontend
echo "REACT_APP_CLOUDINARY_CLOUD_NAME=your_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_preset" > .env
npm install
npm start

# Backend (just stores URLs)
cd ../backend
echo "MONGO_URI=your_mongodb_connection_string" > .env
npm install
npm run dev