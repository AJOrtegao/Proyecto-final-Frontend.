import React, { useState } from 'react';
import axios from 'axios';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/auth/signup', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      alert('User created successfully');
    } catch (error) {
      alert('Error creating user');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;