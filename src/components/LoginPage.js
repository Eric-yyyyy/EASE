// LoginPage.js
import React, { useState } from 'react';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { data: users, isPending, error } = useFetch('http://localhost:8000/students');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('UR Active Directory'); 

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users?.find(user => user.user_id === username && user.password === password);
    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      alert('Login successful');
      navigate('/home');
    } else {
      alert('Username or password is incorrect');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/home');
  };

  const handleBack = () =>{
    navigate('/home')
  };

  // Check if the user is already logged in
  if (localStorage.getItem('user')) {
    return (
      <div className="login-container">
        <p>You are already logged in.</p>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleBack}>Back</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Sign in with your username and password</h1>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <select value={domain} onChange={(e) => setDomain(e.target.value)}>
          <option value="UR Active Directory">UR Active Directory</option>
          {/* Add more domains if necessary */}
        </select>
        <button type="submit" disabled={isPending}>Sign in</button>
        {error && <div>Error: {error}</div>}
      </form>
      <a href="#" className="help-link">Need help?</a>
    </div>
  );
};

export default LoginPage;
