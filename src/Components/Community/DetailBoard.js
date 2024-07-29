import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const DetailBoard = () => {
  const { postId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState({});

  useEffect(() => {
    // postId를 이용해 특정 게시물 정보를 가져오는 API 호출 예시
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`); // API 엔드포인트에 맞게 수정
        setPost(response.data); // 서버에서 받아온 게시물 정보 설정
      } catch (error) {
        console.error(`Error fetching post ${postId}:`, error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`); // API 엔드포인트에 맞게 수정
      history.push('/'); // 삭제 후 메인 페이지로 이동
      alert('게시물이 삭제되었습니다.');
    } catch (error) {
      console.error(`Error deleting post ${postId}:`, error);
    }
  };

  return (
    <div>
      <h2>게시물 상세 정보</h2>
      <h3>{post.title}</h3>
      <p>작성자: {post.author}</p>
      <p>작성일: {post.createdAt}</p>
      <p>{post.content}</p>
      <button onClick={handleDelete}>게시물 삭제</button>
    </div>
  );
};

export default DetailBoard;
