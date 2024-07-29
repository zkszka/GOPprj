import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dbAxios from '../../api/axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';

const MainBoard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 게시물 목록을 가져오는 API 호출 예시
    const fetchPosts = async () => {
      try {
        const response = await dbAxios.get('/posts'); // API 엔드포인트에 맞게 수정
        setPosts(response.data); // 서버에서 받아온 게시물 목록 설정
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
        <Navbar/>
      <h2>게시물 목록</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <p>작성자: {post.author}</p>
            <p>작성일: {post.createdAt}</p>
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default MainBoard;
