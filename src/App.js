import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuList from './components/MenuList';
import HomeScreen from './components/Screens/HomeScreen';
import CourseScreen from './components/Screens/CourseScreen';
import CalendarScreen from './components/Screens/CalendarScreen';
import ChatScreen from './components/Screens/ChatScreen';
import LoginPage from './components/LoginPage';
import ChatServer from './components/ChatServer';
import AboutScreen from './components/Screens/AboutScreen';
import Notification from './components/Notification';
import { NotificationProvider } from './components/Notificationcontext';
import useEventNotifier from './components/useEventNotifier';
import './CSS/Style.css';
import CourseServerScreen from './components/Screens/CourseServerScreen';

const App = () => {

  return (
    <NotificationProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<MainLayout />} />
            
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
};

const MainLayout = () => {
  useEventNotifier();
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
         {/* <MenuList />  */}
       <CourseScreen /> 
      </aside>
      <main className="main">
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/course" element={<CourseScreen />} />
          <Route path="/calendar/:userId" element={<CalendarScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/courseserver/:courseId" element={<CourseServerScreen />} />
          <Route path="/courseserver/:courseId/:channelId" element={<ChatServer />} />
          <Route path = "/About" element = {<AboutScreen/>}/>
          <Route path = "/Notification" element = {<Notification/>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
