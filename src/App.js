import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuList from './components/MenuList';
import HomeScreen from './components/Screens/HomeScreen';
import CourseScreen from './components/Screens/CourseScreen';
import CalendarScreen from './components/Screens/CalendarScreen';
import ChatScreen from './components/Screens/ChatScreen';
import LoginPage from './components/LoginPage';
import './CSS/Style.css';

const App = () => {
  
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </div>
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();

  if (location.pathname === '/login') {
    
    return null;
  }


  return (
    <>

      <header className="header">
        <Navbar />
      </header>
      <aside className="aside">
        <MenuList />
      </aside>
      <main className="main">
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/course" element={<CourseScreen />} />
          <Route path="/calendar" element={<CalendarScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
