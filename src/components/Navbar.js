import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Navbar.css';
import logo from "../assets/final-logo.svg"
import profile from "../assets/profile.svg"



const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.user_id : null; 
  console.log(userId)
  return (
    <nav className="navbar">
      <img height='35px' src={logo} alt='logo'></img>
      <div className="links">
        <a href="/notification">Notification</a>
        <a href={userId ? `/calendar/${userId}` : "/login"}>Calendar</a>
        <a href="/About">About</a>
        <a href="/"><img src={profile} alt="profile" height="50px"></img></a>
      </div>
    </nav>
  );
}

export default Navbar;