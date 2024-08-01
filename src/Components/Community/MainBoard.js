import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import dbAxios from '../../api/axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import './MainBoard.css';

const MainBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('popular'); // 디폴트로 인기순 정렬
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await dbAxios.get('/posts');
        let sortedPosts = [...response.data]; // Copy to avoid mutating original array

        if (sortOrder === 'latest') {
          sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortOrder === 'popular') {
          sortedPosts.sort((a, b) => b.views - a.views);
        }

        // 검색 필터 적용
        if (searchTerm) {
          sortedPosts = sortedPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setPosts(sortedPosts);
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
  }, [sortOrder, searchTerm]); // sortOrder와 searchTerm이 변경될 때마다 다시 가져오기

  // 페이지네이션 처리
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
      <Navbar /><hr/>
      <center><h2>GOP 커뮤니티</h2></center>
      <div className="search-container">
        <div className="sort-container">
          <label>정렬 기준:</label>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select>
        </div>
        <div className="search-form">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="button" onClick={() => setSearchTerm(searchTerm)}>
            검색
          </button>
        </div>
      </div>
      <table className="post-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>댓글수</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1 + indexOfFirstPost}</td> {/* 게시물 번호 */}
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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="create-post-container">
        <button type="button" onClick={handlePostClick} className="create-post-button">
          게시물 등록하기
        </button>
      </div>
      <br/><br/><br/>
      <Footer />
    </div>
  );
};

export default MainBoard;
