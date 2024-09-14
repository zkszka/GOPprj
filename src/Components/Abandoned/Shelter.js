import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import './Shelter.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import

const Shelter = () => {
  // 검색 조건을 담는 상태 변수
  const [searchParams, setSearchParams] = useState({
    care_nm: '', // 동물보호센터명
  });

  // API 호출 중 상태 관리
  const [loading, setLoading] = useState(false);

  // API 응답 데이터 관리
  const [data, setData] = useState(null);

  // API 호출 중 발생한 오류 관리
  const [error, setError] = useState(null);

  // 페이지 번호 상태 관리
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지네이션 관련 상태 변수들
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(12); // 한 페이지 결과 수
  const [paginationRange, setPaginationRange] = useState({
    start: 1,
    end: 10
  }); // 페이지네이션 범위 설정

  // 페이지네이션 범위 계산 함수
  const calculatePaginationRange = () => {
    const totalPages = Math.ceil(totalCount / perPage);
    let startPage = currentPage <= 5 ? 1 : currentPage - 4;
    let endPage = startPage + 9;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - 9;
      if (startPage < 1) {
        startPage = 1;
      }
    }

    setPaginationRange({ start: startPage, end: endPage });
  };

  // 페이지네이션 처리 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleSubmit(); // 페이지 변경 시 데이터 다시 불러오기
  };

  // 입력 필드 값 변경 시 호출되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  // 폼 제출 함수
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const serviceKey = 'rVXpgEeih%2BlnN57euuJZoWNcJUK2tMLSqy9Nd%2F7cpLHQzJ8to5pNWWTZSHh8luaU5f%2Blxc2zmZzMYu4gytBTrg%3D%3D';
      // 쿼리 파라미터
      const queryParams = `?${encodeURIComponent('serviceKey')}=${serviceKey}&${encodeURIComponent('care_nm')}=${encodeURIComponent(searchParams.care_nm)}&${encodeURIComponent('numOfRows')}=${encodeURIComponent(perPage)}&${encodeURIComponent('pageNo')}=${encodeURIComponent(currentPage)}&${encodeURIComponent('_type')}=${encodeURIComponent('json')}`;
      // API 엔드포인트 URL
      const url = 'http://apis.data.go.kr/1543061/animalShelterSrvc/shelterInfo';
      // API 호출
      const response = await axios.get(url + queryParams);
      console.log('API 호출 성공:', response.data);
      setData(response.data);
      // 전체 결과 수 
      setTotalCount(response.data.response.body.totalCount);
      // 페이지네이션 범위 
      calculatePaginationRange();
    } catch (error) {
      // 오류 메시지
      console.error('API 호출 에러:', error);
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      // 로딩 상태 해제
      setLoading(false);
    }
  };

  // 페이지 로드 시 초기 데이터 불러오기 (예: 첫 페이지 데이터)
  useEffect(() => {
    handleSubmit(); // 폼 제출 함수 호출
  }, []); // 초기 렌더링 시 한 번만 호출

  return (
    <div>
      <Navbar />
      <div className="data-container mt-5">
        <h1 className="text-center mb-4">동물보호센터 조회</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="row justify-content-center mb-3">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <input type="text" name="care_nm" value={searchParams.care_nm} onChange={handleChange} className="form-control" placeholder="동물보호센터명" />
            </div>
            <div className="col-lg-2 col-md-4 col-sm-2">
              <button type="submit" className="btn btn-primary btn-block">검색</button>
            </div>
          </div>
        </form><br/><br/>

        {/* 로딩 중일 때 표시 */}
        {loading && <p className="text-center">Loading...</p>}
        {/* 오류 발생 시 표시 */}
        {error && <p className="text-center text-danger">{error}</p>}
        {/* 데이터가 있는 경우 표시 */}
        {data && data.response && data.response.body && data.response.body.items && data.response.body.items.item ? (
          <div><hr/><br/>
            <h2 className="mt-4 mb-3 text-center">검색 결과</h2>
            <p className="text-center">전체 결과 수: {totalCount}</p>
            <div className="row">
              {data.response.body.items.item.map((item, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4"> {/* col-md-6 추가하여 작은 화면에서도 2개씩 정렬 */}
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.careNm}</h5>
                      <p className="card-text">관리기관명: {item.orgNm}</p>
                      <p className="card-text">소재지도로명주소: {item.careAddr}</p>
                      <p className="card-text">전화번호: {item.careTel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 부트스트랩 페이지네이션 컴포넌트 */}
            <Pagination
              totalCount={totalCount}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              paginationRange={paginationRange}
            />
          </div>
        ) : (
          <p className="text-center">No data found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

// 부트스트랩 페이지네이션 컴포넌트
const Pagination = ({ totalCount, perPage, currentPage, onPageChange, paginationRange }) => {
  const totalPages = Math.ceil(totalCount / perPage);

  if (totalPages === 1) {
    return null; // 페이지가 한 개일 경우 페이지네이션을 표시하지 않음
  }

  const pages = [];
  for (let i = paginationRange.start; i <= paginationRange.end; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {/* 이전 페이지로 이동 버튼 */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
        </li>

        {/* 페이지 번호 버튼 */}
        {pages.map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}

        {/* 다음 페이지로 이동 버튼 */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
};

export default Shelter;
