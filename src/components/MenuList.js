import React from 'react';
import '../CSS/Menulist.css';
import { useNavigate, useLocation } from 'react-router-dom';

function MenuList() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeStyle = {
    backgroundColor: 'black',
    color: 'white',
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="menu-list">
      <button
        onClick={() => handleNavigation('/home')}
        style={isActive('/home') ? { ...{}, ...activeStyle } : {}}
      >
        EASE
      </button>
      <button
        onClick={() => handleNavigation('/course')}
        style={isActive('/course') || window.location.pathname.startsWith('/courseserver/') ? activeStyle : {}}
      >
        Courses
      </button>
      <button
        onClick={() => handleNavigation('/calendar')}
        style={isActive('/calendar') ? activeStyle : {}}
      >
        Calendar
      </button>
      <button
        onClick={() => handleNavigation('/chat')}
        style={isActive('/chat') ? activeStyle : {}}
      >
        Chat
      </button>
    </div>
  );
}

export default MenuList;
