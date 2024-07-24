import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Navbar/Header';
import './Signup.css';
import dbAxios from "../../api/axios.js";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await dbAxios.post('/join', {
        username: username,
        email: email,
        password: password
      });

      console.log('회원가입 응답:', response.data);
      alert('회원가입 되었습니다.');
      navigate('/login');

    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Header /><br /><br /><br />
      <div className='signup-container'>
        <center><h2>Sign up</h2></center>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Name :</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">회원가입</button>
        </form>
      </div>
      <div className="signup-find text-center mt-3">
        이미 회원이신가요? <Link to="/login" className="login-link">로그인</Link>
      </div>
    </div>
  );
};

export default Signup;
