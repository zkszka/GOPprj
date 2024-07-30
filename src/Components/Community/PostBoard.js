import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dbAxios from '../../api/axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';

const PostBoard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await dbAxios.get('/check-session');
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUserEmail(response.data.email);
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dbAxios.post('/posts', { title, content, userEmail });
      setTitle('');
      setContent('');
      alert('게시물이 등록되었습니다.');
      navigate('/community/main_board'); // 등록 완료 후 이동
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (!isLoggedIn) {
    return <p>로그인 후 게시물 등록이 가능합니다.</p>;
  }

  return (
    <div>
      <Navbar />
      <h2>게시물 등록</h2>
      <form onSubmit={handleSubmit}>
        <label>제목:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>내용:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">등록 완료</button>
      </form>
      <Footer />
    </div>
  );
};

export default PostBoard;
