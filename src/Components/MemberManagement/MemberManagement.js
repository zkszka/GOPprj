// src/components/MemberManagement.js
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import dbAxios from '../../api/axios';
import './MemberManagement.css'; // CSS 파일 import

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [updatedMember, setUpdatedMember] = useState({});

  // 회원 목록을 가져오는 함수
  const fetchMembers = async () => {
    try {
      const response = await dbAxios.get('/admin/members'); // URL 확인 필요
      setMembers(response.data);
    } catch (error) {
      console.error('회원 목록 가져오기 실패:', error);
    }
  };

  // 회원 정보를 업데이트하는 함수
  const updateMember = async (id) => {
    if (window.confirm('수정하시겠습니까?')) {
      try {
        await dbAxios.put(`/admin/members/${id}`, updatedMember);
        fetchMembers(); // 업데이트 후 목록 새로 고침
        alert('저장되었습니다.');
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

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>회원 관리</h2>
        <table className="member-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>역할</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id} className={member.role === 'ADMIN' ? 'admin-row' : ''}>
                <td>{member.id}</td>
                <td>{member.username}</td>
                <td>{member.email}</td>
                <td>
                  <input
                    type="text"
                    value={member.role}
                    disabled={member.role === 'ADMIN'} // ADMIN 역할은 수정 불가
                    onChange={(e) => setUpdatedMember({ ...updatedMember, role: e.target.value })}
                  />
                </td>
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
              onChange={(e) => setUpdatedMember({ ...updatedMember, email: e.target.value })}
              placeholder="이메일"
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
      </div>
      <br /><br /><br /><br /><br />
      <Footer />
    </div>
  );
};

export default MemberManagement;
