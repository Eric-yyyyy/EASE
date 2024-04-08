
import React from 'react';
import Navbar from './components/Navbar';
import MenuList from './components/MenuList';
import HomeScreen from './components/Screens/HomeScreen';
import CourseScreen from './components/Screens/CourseScreen';
import CalendarScreen from './components/Screens/CalendarScreen';

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import './CSS/Style.css'; 

function App() {
  return (
    <Router> 
      <div className="app">
        <header className="header">
          <Navbar />
        </header>
        <aside className="aside">
          <MenuList />
        </aside>
        <main className="main">
          <Routes> {/* Replace Switch with Routes */}
            <Route exact path="/" element={<HomeScreen />} /> 
            <Route exact path="/course" element={<CourseScreen />} />
            <Route exact path="/calendar" element={<CalendarScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
