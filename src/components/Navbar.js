import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Navbar.css';
import logo from "../assets/final-logo.svg"



const Navbar = () => {
  return (
    <nav className="navbar">
      <img height='35px' src={logo} alt='logo'></img>
      <div className="links">
        <a href="/About">About</a>
        <a href="/">Login</a>
      </div>
    </nav>
  );
}

export default Navbar;