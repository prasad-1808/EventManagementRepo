import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaBars } from "react-icons/fa";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-900 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link className="text-white text-2xl font-bold" to="/">
          Event Manager
        </Link>

        <button
          className="text-white lg:hidden"
          type="button"
          onClick={toggleDropdown}
        >
          <FaBars />
        </button>

        <div
          className={`lg:flex lg:items-center lg:w-auto w-full ${
            isDropdownOpen ? "block" : "hidden"
          }`}
        >
          <ul className="lg:flex lg:justify-end w-full space-y-2 lg:space-y-0 lg:space-x-6 text-lg mt-4 lg:mt-0 text-white">
            <li>
              <Link className="hover:text-gray-400" to="/">
                Home
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link className="hover:text-gray-400" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-400" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="hover:text-gray-400" to="/albums">
                    Albums
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-400" to="/upload">
                    Upload
                  </Link>
                </li>
                <li className="relative">
                  <FaRegUserCircle
                    className="text-3xl cursor-pointer hover:text-gray-400"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <ul className="absolute right-0 bg-white text-gray-900 shadow-lg rounded-md mt-2 w-32 py-2">
                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-200 text-center"
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
