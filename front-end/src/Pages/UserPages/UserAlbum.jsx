// UserAlbum.jsx

import React, { useState } from "react";
import axios from "axios";
import "../../styles/Album.less"; // Import the .less file for custom styles

const UserAlbum = () => {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  // Redirect to Google OAuth login
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  // Fetch folders from Google Drive
  const fetchFolders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/drive/folders",
        {
          withCredentials: true, // Include cookies for authentication
        }
      );
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  // Fetch files within a specific folder by folder ID
  const fetchFilesInFolder = async (folderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/drive/folders/${folderId}/files`,
        { withCredentials: true }
      );
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files in folder:", error);
    }
  };

  return (
    <div className="user-album-container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">
        User Album
      </h1>

      {/* Authentication Button */}
      <button
        onClick={handleLogin}
        className="auth-button px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 mb-4"
      >
        Login with Google
      </button>

      {/* Fetch Folders Button */}
      <button
        onClick={fetchFolders}
        className="fetch-button px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 mb-8"
      >
        Fetch Folders
      </button>

      {/* Display Folders */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Drive Folders:
      </h2>
      <ul className="folders-list space-y-3 mb-8">
        {folders.map((folder) => (
          <li
            key={folder.id}
            className="folder-item bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            {folder.name}
            <button
              onClick={() => fetchFilesInFolder(folder.id)}
              className="view-files-button ml-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
            >
              View Files
            </button>
          </li>
        ))}
      </ul>

      {/* Display Files in Selected Folder */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Files in Selected Folder:
      </h2>
      <div className="files-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="file-item bg-white p-4 rounded-lg shadow-md"
          >
            <img
      src={`https://drive.google.com/thumbnail?id=${file.id}`}
      alt={file.name}
      className="file-image w-full h-40 object-cover rounded-lg mb-2"
    />
            <p className="file-name text-gray-600 text-center">{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAlbum;
