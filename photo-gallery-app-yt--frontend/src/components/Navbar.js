// navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css"; // Import your CSS file

const Navbar = ({ token, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav__logo">Photo Gallery App</div>
      <ul className="nav__links">
        {!token ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogoutClick}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
