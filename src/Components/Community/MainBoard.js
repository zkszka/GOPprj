import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import dbAxios from '../../api/axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import './MainBoard.css';

const MainBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await dbAxios.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('게시물 가져오기 오류:', error);
      }
    };

    const checkSession = async () => {
      try {
        const response = await dbAxios.get('/check-session');
        setIsLoggedIn(response.status === 200);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    fetchPosts();
    checkSession();
  }, []);

  const handlePostClick = () => {
    if (isLoggedIn) {
      navigate('/community/post'); // 로그인된 경우 게시물 등록 페이지로 이동
    } else {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  return (
    <div>
      <Navbar />
      <h2>게시물 목록</h2>
      <button type="button" onClick={handlePostClick} className="create-post-button">
        게시물 등록하기
      </button>
      <table className="post-table">
        <thead>
          <tr>
            <th>번호</th> {/* 추가된 헤더 */}
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>댓글수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1}</td> {/* 게시물 번호 */}
              <td>
                <Link to={`/community/detail/${post.id}`} className="post-title">{post.title}</Link>
              </td>
              <td>{post.author}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>{post.views}</td>
              <td>{post.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default MainBoard;
