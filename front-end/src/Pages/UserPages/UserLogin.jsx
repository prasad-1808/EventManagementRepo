import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/Register.less";

function UserLogin({ setIsLoggedIn }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("wedding_party");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", {
        mobileNumber,
        password,
        role,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token); // Save token
      setIsLoggedIn(true); // Update login state
      setErrorMessage("");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

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
          Login
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
