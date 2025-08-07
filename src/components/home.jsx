import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation (replace with real auth logic as needed)
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    navigate('/main');
  };

  return (
    <div className="loginheaven" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ background: 'white', padding: '2rem 3rem', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', minWidth: 320 }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2dc3ff', fontFamily: 'Cursive, Comic Sans MS, sans-serif' }}>Welcome to Chemquest</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: 4, color: '#031634' }}>Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #cde0ff', fontSize: 16 }}
              autoComplete="username"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 4, color: '#031634' }}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #cde0ff', fontSize: 16 }}
              autoComplete="current-password"
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          <button type="submit" style={{ width: '100%', padding: '10px 0', background: '#2dc3ff', color: 'white', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
