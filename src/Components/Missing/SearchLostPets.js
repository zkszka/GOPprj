import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import dbAxios from '../../api/axios';
import './SearchLostPets.css'; // CSS 파일 import

const SearchLostPets = () => {
  const [lostPets, setLostPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12); // 페이지당 데이터 수 (3개 x 4열)
  const [totalCount, setTotalCount] = useState(0);
  const [userRole, setUserRole] = useState(null); // 사용자 역할 상태 추가

  useEffect(() => {
    const fetchLostPets = async () => {
      try {
        const response = await dbAxios.get('/missing/all'); // 서버에서 모든 실종 동물 데이터 가져오기
        const pets = response.data;

        // 최신 등록된 순서로 정렬 (내림차순)
        pets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setLostPets(pets);
        setTotalCount(pets.length); // 전체 데이터 수 설정
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lost pets:', error);
      }
    };

    const fetchUserRole = async () => {
      try {
        const response = await dbAxios.get('/check-session'); // 사용자 세션 정보 가져오기
        if (response.status === 200) {
          setUserRole(response.data.role); // 사용자 역할 설정
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchLostPets();
    fetchUserRole();
  }, []);

  // 페이지네이션 데이터 계산
  const indexOfLastPet = currentPage * perPage;
  const indexOfFirstPet = indexOfLastPet - perPage;
  const currentPets = lostPets.slice(indexOfFirstPet, indexOfLastPet);

  // 페이지네이션 처리 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / perPage);

  // 삭제 처리 함수
  const handleDelete = async (petId) => {
    // 삭제 확인 대화상자 표시
    const confirmed = window.confirm('삭제하시겠습니까?');
    if (confirmed) {
      try {
        await dbAxios.delete(`/missing/${petId}`);
        // 삭제 후 데이터 새로고침
        setLostPets(lostPets.filter(pet => pet.id !== petId));
        setTotalCount(totalCount - 1);
      } catch (error) {
        console.error('Error deleting pet:', error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container search-lost-pets-container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <div className="card search-lost-pets-card">
              <div className="card-body search-lost-pets-card-body">
                <h2 className="text-center mb-4">실종 동물 조회</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="row">
                    {currentPets.length > 0 ? (
                      currentPets.map(pet => (
                        <div key={pet.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                          <div className="card search-lost-pets-item">
                            <div className="image-container">
                              {pet.photo && (
                                <img
                                  src={`data:image/jpeg;base64,${pet.photo}`}
                                  alt={pet.petName}
                                  className="img-fluid"
                                />
                              )}
                            </div>
                            <div className="card-body">
                              <h5 className="card-title">{pet.petName}</h5>
                              <p className="card-text">종류: {pet.species}</p>
                              <p className="card-text">특징 및 설명: {pet.description}</p>
                              <p className="card-text">연락처: {pet.contactInfo}</p>
                              {userRole === 'ADMIN' && (
                                <button
                                  className="delete-button"
                                  onClick={() => handleDelete(pet.id)}
                                >
                                  삭제
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>등록된 실종 동물이 없습니다.</p>
                    )}
                  </div>
                )}
                {/* 페이지네이션 컴포넌트 */}
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/><br/><br/><br/><br/><br/>
      <Footer />
    </div>
  );
};

// 페이지네이션 컴포넌트
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* 이전 페이지 버튼 */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
        </li>

        {/* 페이지 번호 버튼 */}
        {pages.map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}

        {/* 다음 페이지 버튼 */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
};

export default SearchLostPets;
