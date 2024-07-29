import React, { useState } from 'react';
import dbAxios from '../../api/axios';

const PostBoard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dbAxios.post('/posts', { title, content }); // API 엔드포인트에 맞게 수정
      setTitle('');
      setContent('');
      alert('게시물이 등록되었습니다.');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default PostBoard;
