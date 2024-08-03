import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dbAxios from '../../api/axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import './UpdateBoard.css';

const UpdateBoard = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await dbAxios.get('/check-session');
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await dbAxios.get(`/posts/${postId}`);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('게시물 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 수정 요청에서 author를 제외합니다.
      await dbAxios.put(`/posts/${postId}`, { title, content });
      alert('게시물이 수정되었습니다.');
      navigate('/community/main_board'); // 수정 완료 후 이동
    } catch (error) {
      console.error('Error updating post:', error);
      alert('게시물 수정에 문제가 발생했습니다.');
    }
  };

  if (!isLoggedIn) {
    return <p className="login-message">로그인 후 게시물 수정을 할 수 있습니다.</p>;
  }

  return (
    <div>
      <Navbar /><hr/>
      <h2>게시물 수정</h2><br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="게시물 제목을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label>내용:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시물 내용을 입력하세요"
            required
          />
        </div>
        <div className="button-container">
          <button type="button" className="cancel-button" onClick={() => navigate('/community/main_board')}>메인으로</button>
          <button type="submit" className="submit-button">수정</button>
        </div>
      </form><br/><br/><br/><br/>
      <Footer />
    </div>
  );
};

export default UpdateBoard;
