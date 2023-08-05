import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });

      if (res.data === 'exist') {
        navigate('/user-booking');
      } else if (res.data === 'notexist') {
        alert('User has not signed up');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Failed to log in. Please try again.');
      console.log(error);
    }
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <br />
      <form onSubmit={submit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <br />
        <button type='submit'>Login</button>
      </form>
      <p>
        New User? <Link to='/signup'>Signup</Link>
      </p>
    </div>
  );
}

export default Login;
