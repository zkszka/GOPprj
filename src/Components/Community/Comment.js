import React, { useState, useEffect } from 'react';
import dbAxios from '../../api/axios';
import './Comment.css';

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // 운영자 여부를 저장하는 상태 추가

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await dbAxios.get(`/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error(`댓글을 가져오는 중 오류 발생: ${postId}`, error);
        alert('댓글을 가져오는 데 문제가 발생했습니다.');
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await dbAxios.get('/check-session');
        setCurrentUserEmail(response.data.email || '');
        setIsAdmin(response.data.role === 'ADMIN'); // 역할 정보를 가져와서 운영자 여부 설정
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
        alert('사용자 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };

    fetchComments();
    fetchCurrentUser();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await dbAxios.post(`/posts/${postId}/comments`, {
        content: newComment,
        author: currentUserEmail // 현재 사용자의 이메일을 추가
      });
      setNewComment('');
      // 댓글 새로고침
      const response = await dbAxios.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error(`댓글 추가 중 오류 발생: ${postId}`, error);
      alert('댓글 추가에 문제가 발생했습니다.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await dbAxios.delete(`/posts/${postId}/comments/${commentId}`);
        // 댓글 새로고침
        const response = await dbAxios.get(`/posts/${postId}/comments`);
        setComments(response.data);
        alert('댓글이 삭제되었습니다.');
      } catch (error) {
        console.error(`댓글 삭제 중 오류 발생: ${commentId}`, error);
        alert('댓글 삭제에 문제가 발생했습니다.');
      }
    }
  };

  // 댓글을 최신 댓글이 먼저 보이도록 역순으로 정렬
  const sortedComments = [...comments].reverse();

  return (
    <div className="comment-container">
      <h3 className="comment-title">댓글</h3>
      <div className="comment-form">
        <textarea
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <button className="comment-submit-button" onClick={handleAddComment}>
          댓글 추가
        </button>
      </div>
      <ul className="comment-list">
        {sortedComments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-author-container">
              <p className="comment-author"> {comment.author}</p>
              {(comment.author === currentUserEmail || isAdmin) && (
                <button
                  className="comment-delete-button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  삭제
                </button>
              )}
            </div>
            <p className="comment-content">{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
