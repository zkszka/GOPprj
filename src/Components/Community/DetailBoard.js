import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dbAxios from '../../api/axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';

const DetailBoard = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await dbAxios.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error(`Error fetching post ${postId}:`, error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await dbAxios.delete(`/posts/${postId}`);
      navigate('/'); // 삭제 후 메인 페이지로 이동
      alert('게시물이 삭제되었습니다.');
    } catch (error) {
      console.error(`Error deleting post ${postId}:`, error);
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <Navbar/>
      <h2>게시물 상세 정보</h2>
      <h3>{post.title}</h3>
      <p>작성자: {post.author}</p>
      <p>작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
      <p>{post.content}</p>
      <button onClick={handleDelete}>게시물 삭제</button>
      <Footer/>
    </div>
  );
};

export default DetailBoard;
