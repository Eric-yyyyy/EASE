import React from 'react';
import '../CSS/Menulist.css';
import { useNavigate, useLocation } from 'react-router-dom';

function MenuList() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const activeStyle = {
    backgroundColor: 'blue',
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
        style={isActive('/') ? { ...{ height: 50 }, ...activeStyle } : { height: 50 }}
      >
        EASE
      </button>
      <button
        onClick={() => handleNavigation('/course')}
        style={isActive('/course') ? activeStyle : {}}
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
