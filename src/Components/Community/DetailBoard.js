import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dbAxios from '../../api/axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import './DetailBoard.css';

const DetailBoard = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await dbAxios.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error(`Error fetching post ${postId}:`, error);
        alert('게시물 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await dbAxios.get('/check-session');
        setCurrentUserEmail(response.data.email || '');
      } catch (error) {
        console.error('Error fetching user session:', error);
        alert('사용자 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };

    fetchPost();
    fetchCurrentUser();
  }, [postId]);

  useEffect(() => {
    if (post && currentUserEmail) {
      setIsAuthor(post.author === currentUserEmail);
    }
  }, [post, currentUserEmail]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('게시물을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await dbAxios.delete(`/posts/${postId}`);
        navigate('/community/main_board'); // 삭제 후 커뮤니티 메인 보드로 이동
        alert('게시물이 삭제되었습니다.');
      } catch (error) {
        console.error(`Error deleting post ${postId}:`, error);
        alert('게시물 삭제에 문제가 발생했습니다.');
      }
    }
  };

  const handleGoToMainBoard = () => {
    navigate('/community/main_board'); // 메인 게시판 페이지로 이동
  };

  const handleEdit = () => {
    navigate(`/community/update/${postId}`); // 수정 페이지로 이동
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <Navbar />
      <div className='detail-board-container'>
        <div className="detail-board-content">
          <h2 className="detail-board-title">게시물 상세 정보</h2>
          <h3 className="detail-board-post-title">{post.title}</h3>
          <p className="detail-board-post-author">작성자: {post.author}</p>
          <p className="detail-board-post-date">작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
          <p className="detail-board-post-content">{post.content}</p>
          <div className="detail-board-button-container">
            {isAuthor && (
              <>
                <button className="detail-board-delete-button" onClick={handleDelete}>삭제</button>
                <button className="detail-board-edit-button" onClick={handleEdit}>수정</button>
              </>
            )}
            <button className="detail-board-main-board-button" onClick={handleGoToMainBoard}>메인으로</button>
          </div>
        </div>
      </div><br/><br/><br/><br/>
      <Footer />
    </div>
  );
};

export default DetailBoard;
