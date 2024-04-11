import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Navbar.css';



const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 style={{ margin: 0 }}>EASE</h1>
      <div className="links">
      <a href="/About">About</a>
      <a href="/">Login</a>
      </div>
    </nav>
  );
}
 
export default Navbar;