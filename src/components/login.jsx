import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Reset body height when this component mounts
    document.body.style.height = "100vh";
    // Optionally, also reset overflow
    document.body.style.overflow = "hidden";
    // Clean up on unmount (optional, but good practice)
    return () => {
      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      navigate('/main');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both school email and password.');
      return;
    }

    const API_BASE = 'http://localhost:3000';

    if (isRegister) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || 'Registration failed');
          return;
        }
        setError('Registration successful! Please login.');
        setIsRegister(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        setError('Unable to connect to server. Please try again.');
      }
    } else {
      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || 'Login failed');
          return;
        }
        if (data?.token) {
          localStorage.setItem('auth_token', data.token);
        }
        navigate('/main');
      } catch (err) {
        setError('Unable to connect to server. Please try again.');
      }
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="loginheaven" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ background: 'white', padding: '2rem 3rem', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', minWidth: 320 }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2dc3ff', fontFamily: 'Cursive, Comic Sans MS, sans-serif' }}>Welcome to Chemquest</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: 4, color: '#031634' }}>School Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #cde0ff', fontSize: 16 }}
              autoComplete="email"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 4, color: '#031634' }}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #cde0ff', fontSize: 16 }}
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </div>
          {isRegister && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: 4, color: '#031634' }}>Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #cde0ff', fontSize: 16 }}
                autoComplete="new-password"
              />
            </div>
          )}
          {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          <button type="submit" style={{ width: '100%', padding: '10px 0', background: '#2dc3ff', color: 'white', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
            {isRegister ? 'Register' : 'Login'}
          </button>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={toggleMode}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#2dc3ff', 
                cursor: 'pointer', 
                textDecoration: 'underline',
                fontSize: 14
              }}
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
