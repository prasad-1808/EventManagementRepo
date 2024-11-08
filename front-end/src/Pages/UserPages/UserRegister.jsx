import React, { useState } from "react";
import api from "../../services/api";
import "../../styles/Register.less";

function UserRegister() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("wedding_party");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/register", {
        mobileNumber,
        fullName,
        password,
        role,
      });
      console.log("Registration successful:", response.data);
      setSuccessMessage("Registration successful!");
      setErrorMessage("");
      // Optionally, redirect or perform additional actions after registration
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Registration failed. Please try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-center mb-4">
            {successMessage}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        >
          <option value="wedding_party">Wedding Party</option>
          <option value="relatives">Relatives</option>
        </select>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default UserRegister;
