// UserAlbum.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserAlbum = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [folders, setFolders] = useState([]);

  // Handle authentication click
  const handleAuthClick = async () => {
    try {
      const response = await axios.get("/api/auth/google"); // Endpoint to start auth process
      window.location.href = response.data.authUrl; // Redirect to Google OAuth URL
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  // Fetch folders after successful authentication
  const fetchFolders = async () => {
    try {
      const response = await axios.get("/api/googleDrive/folders");
      setFolders(response.data.folders);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    }
  };

  // Check if authenticated and fetch folders
  useEffect(() => {
    if (authenticated) {
      fetchFolders();
    }
  }, [authenticated]);

  return (
    <div>
      {!authenticated ? (
        <button onClick={handleAuthClick}>Authenticate to get started</button>
      ) : (
        <div>
          <h2>Your Folders</h2>
          <ul>
            {folders.map((folder) => (
              <li key={folder.id}>{folder.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAlbum;
