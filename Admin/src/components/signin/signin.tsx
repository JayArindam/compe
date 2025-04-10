import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';
import bgImage from './bg.jpg'; // <-- import image directly

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/v1/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.message || 'Invalid credentials'}`);
        return;
      }

      if (data.role !== 'admin') {
        setMessage('Access denied: Only admins can sign in.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } catch (error: any) {
      setMessage(`Request failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="page-container">
      <img src={bgImage} alt="background" className="bg-img" />

      <form onSubmit={handleSignIn} className="main-form">
        <h2>Sign In</h2>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign In</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default SignInForm;