import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import { Pagination } from 'react-bootstrap'; // Pagination 컴포넌트 가져오기
import './PetCare.css';

const PetCare = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const serviceKey = 'rVXpgEeih%2BlnN57euuJZoWNcJUK2tMLSqy9Nd%2F7cpLHQzJ8to5pNWWTZSHh8luaU5f%2Blxc2zmZzMYu4gytBTrg%3D%3D';
        const url = `https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=1&perPage=100&serviceKey=${serviceKey}`;

        const response = await axios.get(url);
        setOriginalData(response.data.data);
      } catch (error) {
        console.error('API 호출 에러:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = originalData;

      if (selectedSido) {
        filtered = filtered.filter(facility => facility['시도 명칭'] === selectedSido);
      }
      
      if (selectedSigungu) {
        filtered = filtered.filter(facility => facility['시군구 명칭'] === selectedSigungu);
      }

      filtered = filtered.filter(facility => facility['카테고리2'] === '반려의료');

      setFilteredData(filtered);
    };

    applyFilters();
  }, [selectedSido, selectedSigungu, originalData]);

  const handleSidoChange = (event) => {
    setSelectedSido(event.target.value);
    setSelectedSigungu('');
  };

  const handleSigunguChange = (event) => {
    setSelectedSigungu(event.target.value);
  };

  const renderDataInColumns = (data) => {
    const rows = [];
    for (let i = 0; i < data.length; i += 3) {
      rows.push(
        <div className="row" key={i}>
          {data.slice(i, i + 3).map((facility, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">시설명: {facility['시설명']}</h5>
                  <p className="card-text">기본 정보_장소설명: {facility['기본 정보_장소설명']}</p>
                  <p className="card-text">도로명주소: {facility['도로명주소']}</p>
                  <p className="card-text">지번주소: {facility['지번주소']}</p>
                  <p className="card-text">우편번호: {facility['우편번호']}</p>
                  <p className="card-text">전화번호: {facility['전화번호']}</p>
                  <p className="card-text">휴무일: {facility['휴무일']}</p>
                  <p className="card-text">운영시간: {facility['운영시간']}</p>
                  <p className="card-text">주차 가능여부: {facility['주차 가능여부']}</p>
                  <p className="card-text">홈페이지: {facility['홈페이지']}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  // 페이지네이션 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 맞는 데이터 슬라이싱
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      <Navbar />
      <div className="data-container">
        <h2>반려의료 시설 정보</h2>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label font-weight-bold text1">시도 :</label>
          <div className="col-sm-4">
            <select className="form-control" value={selectedSido} onChange={handleSidoChange}>
              <option value="">전체</option>
              {originalData.map((facility, index) => (
                <option key={index} value={facility['시도 명칭']}>{facility['시도 명칭']}</option>
              ))}
            </select>
          </div>
          <label className="col-sm-2 col-form-label font-weight-bold text2">시군구 :</label>
          <div className="col-sm-4">
            <select className="form-control" value={selectedSigungu} onChange={handleSigunguChange}>
              <option value="">전체</option>
              {originalData
                .filter(facility => facility['시도 명칭'] === selectedSido)
                .map((facility, index) => (
                  <option key={index} value={facility['시군구 명칭']}>{facility['시군구 명칭']}</option>
                ))}
            </select>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : filteredData && filteredData.length > 0 ? (
          <div>
            {renderDataInColumns(paginatedData)}
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PetCare;
