import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateBoard = () => {
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

  const handleUpdate = async (updatedPost) => {
    try {
      await axios.put(`/api/posts/${postId}`, updatedPost); // API 엔드포인트에 맞게 수정
      history.push(`/posts/${postId}`); // 수정 후 해당 게시물 상세 페이지로 이동
    } catch (error) {
      console.error(`Error updating post ${postId}:`, error);
    }
  };

  return (
    <div>
      <h2>게시물 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>제목:</label>
        <input
          type="text"
          value={post.title || ''}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <label>내용:</label>
        <textarea
          value={post.content || ''}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
};

export default UpdateBoard;
