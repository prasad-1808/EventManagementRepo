import "./App.css";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import UserLogin from "./Pages/UserPages/UserLogin";
import UserRegister from "./Pages/UserPages/UserRegister";
import UserAlbum from "./Pages/UserPages/UserAlbum";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    // Optionally handle admin login status based on token here
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          className="Navbar"
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<UserLogin setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register" element={<UserRegister />} />
            <Route
              path="/albums"
              element={isLoggedIn ? <UserAlbum /> : <Navigate to="/login" />}
            />
            {/* Add additional protected or admin routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
