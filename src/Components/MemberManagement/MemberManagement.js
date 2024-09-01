import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import dbAxios from '../../api/axios';
import './MemberManagement.css'; // CSS 파일 import

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [updatedMember, setUpdatedMember] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [blackoutMode, setBlackoutMode] = useState(false);
  const [sortOrder, setSortOrder] = useState('number'); // 정렬 상태
  const itemsPerPage = 10;

  // 회원 목록을 가져오는 함수
  const fetchMembers = async () => {
    try {
      const response = await dbAxios.get('/admin/members'); // URL 확인 필요
      const sortedMembers = response.data
        .sort((a, b) => (a.role === 'ADMIN' ? -1 : b.role === 'ADMIN' ? 1 : 0)); // ADMIN 역할을 맨 위로
      setMembers(sortedMembers);
    } catch (error) {
      console.error('회원 목록 가져오기 실패:', error);
    }
  };

  // 회원 정보를 업데이트하는 함수
  const updateMember = async (id) => {
    if (window.confirm('수정하시겠습니까?')) {
      try {
        const { username, role } = updatedMember;
        await dbAxios.put(`/admin/members/${id}`, { username, role });
        fetchMembers(); // 업데이트 후 목록 새로 고침
        alert('저장되었습니다.');
        setSelectedMember(null); // 수정 후 선택 해제
      } catch (error) {
        console.error('회원 정보 업데이트 실패:', error);
      }
    }
  };

  // 회원 삭제하는 함수
  const deleteMember = async (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        await dbAxios.delete(`/admin/members/${id}`);
        fetchMembers(); // 삭제 후 목록 새로 고침
      } catch (error) {
        console.error('회원 삭제 실패:', error);
      }
    }
  };

  // 페이지네이션을 위한 현재 페이지와 페이지의 데이터 가져오기
  const getPaginatedMembers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return getSortedMembers().slice(startIndex, endIndex);
  };

  // 회원 목록을 정렬하는 함수
  const getSortedMembers = () => {
    let sortedMembers = [...members];
    switch (sortOrder) {
      case 'name':
        sortedMembers.sort((a, b) => a.username.localeCompare(b.username));
        break;
      case 'number':
        sortedMembers.sort((a, b) => a.id - b.id);
        break;
      case 'blackout':
        // 블랙 처리 모드가 활성화된 경우, 블랙 아웃된 행을 먼저 정렬
        sortedMembers.sort((a, b) => {
          return (selectedRows.includes(a.id) ? -1 : 0) - (selectedRows.includes(b.id) ? -1 : 0);
        });
        break;
      default:
        break;
    }
    return sortedMembers;
  };

  // 페이지네이션 버튼 클릭 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (id) => {
    setSelectedRows(prevSelectedRows =>
      prevSelectedRows.includes(id) ? prevSelectedRows.filter(rowId => rowId !== id) : [...prevSelectedRows, id]
    );
  };

  // 블랙 처리 버튼 클릭 핸들러
  const handleBlackoutToggle = () => {
    setBlackoutMode(prev => !prev);
    // 블랙 처리 모드가 비활성화되면 모든 선택 해제
    if (blackoutMode) {
      setSelectedRows([]);
    }
  };

  // 정렬 드롭다운 핸들러
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); // 정렬 변경 시 페이지를 1로 리셋
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const paginatedMembers = getPaginatedMembers();

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="header-controls">
          <select className="sort-dropdown" onChange={handleSortChange} value={sortOrder}>
            <option value="number">번호순</option>
            <option value="name">이름순</option>
            <option value="blackout">블랙순</option>
          </select>
          <button
            className={`blackout-button ${blackoutMode ? 'active' : ''}`}
            onClick={handleBlackoutToggle}
          >
            {blackoutMode ? '블랙 처리 해제' : '블랙 처리'}
          </button>
        </div>
        <table className="member-table">
          <thead>
            <tr>
              <th className="checkbox-cell">
                <input
                  type="checkbox"
                  onChange={(e) => setSelectedRows(e.target.checked ? members.map(member => member.id) : [])}
                  checked={selectedRows.length === members.length}
                />
              </th>
              <th>ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>역할</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.map(member => (
              <tr
                key={member.id}
                className={`${blackoutMode && selectedRows.includes(member.id) ? 'blackout-row' : ''} ${member.role === 'ADMIN' ? 'admin-row' : ''}`}
              >
                <td className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(member.id)}
                    onChange={() => handleCheckboxChange(member.id)}
                  />
                </td>
                <td>{member.id}</td>
                <td>{member.username}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="update-button"
                    disabled={member.role === 'ADMIN'} // ADMIN 역할은 수정 불가
                  >
                    수정
                  </button>
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="delete-button"
                    disabled={member.role === 'ADMIN'} // ADMIN 역할은 삭제 불가
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedMember && (
          <div className="update-form">
            <h3>회원 수정</h3>
            <input
              type="text"
              value={updatedMember.username || selectedMember.username}
              onChange={(e) => setUpdatedMember({ ...updatedMember, username: e.target.value })}
              placeholder="이름"
            />
            <input
              type="text"
              value={updatedMember.email || selectedMember.email}
              placeholder="이메일"
              readOnly
            />
            <input
              type="text"
              value={updatedMember.role || selectedMember.role}
              onChange={(e) => setUpdatedMember({ ...updatedMember, role: e.target.value })}
              placeholder="역할"
            />
            <button onClick={() => updateMember(selectedMember.id)} className="save-button">저장</button>
            <button onClick={() => setSelectedMember(null)} className="cancel-button">취소</button>
          </div>
        )}
        {/* 페이지네이션 */}
        <nav>
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>이전</button>
            </li>
            {/* 페이지 번호를 표시 */}
            {Array.from({ length: Math.ceil(members.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(members.length / itemsPerPage) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>다음</button>
            </li>
          </ul>
        </nav>
      </div>
      <br /><br /><br /><br /><br />
      <Footer />
    </div>
  );
};

export default MemberManagement;
