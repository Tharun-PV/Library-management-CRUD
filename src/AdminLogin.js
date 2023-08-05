import React, { useState } from 'react';
import './AdminLogin.css'; // Import the CSS file for AdminLogin
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleLogin = () => {
    if (email === 'admin@admin' && password === 'admin123') {
      navigate('/add-book'); // Use navigate to go to the AddBook page
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="login">
      <h1>Admin Login</h1><br />
      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <div className="error">{errorMessage}</div>}
        <br /><button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
