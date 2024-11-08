import React, { useState } from "react";
import { uploadPhoto } from "../services/fileService";

function PhotoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) return;

      const fileUrl = await uploadPhoto(selectedFile);
      setUploadedImageUrl(fileUrl);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to upload photo. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {uploadedImageUrl && (
        <div>
          <p>Photo uploaded successfully:</p>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

export default PhotoUpload;
