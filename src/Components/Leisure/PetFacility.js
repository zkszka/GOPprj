import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';

const PetFacility = () => {
  const [originalData, setOriginalData] = useState([]); // 전체 데이터 저장
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 저장
  const [loading, setLoading] = useState(false);
  const [selectedSido, setSelectedSido] = useState(''); // 선택된 시도 명칭
  const [selectedSigungu, setSelectedSigungu] = useState(''); // 선택된 시군구 명칭
  const [selectedCategory2, setSelectedCategory2] = useState(''); // 선택된 카테고리2
  const [category2Options, setCategory2Options] = useState([]); // 카테고리2 옵션들 저장

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const serviceKey = 'rVXpgEeih%2BlnN57euuJZoWNcJUK2tMLSqy9Nd%2F7cpLHQzJ8to5pNWWTZSHh8luaU5f%2Blxc2zmZzMYu4gytBTrg%3D%3D';
        const url = `https://api.odcloud.kr/api/15111389/v1/uddi:41944402-8249-4e45-9e9d-a52d0a7db1cc?page=1&perPage=100&serviceKey=${serviceKey}`;

        const response = await axios.get(url);
        console.log('API 호출 성공:', response.data);

        // 전체 데이터 저장
        setOriginalData(response.data.data);

        // 카테고리2 값 추출하여 중복 제거
        const category2Options = response.data.data
          .map(facility => facility['카테고리2'])
          .filter((value, index, self) => self.indexOf(value) === index);

        // 초기 필터링 적용 (모든 데이터 표시)
        setFilteredData(response.data.data);

        // 선택할 수 있는 카테고리2 옵션 설정
        setCategory2Options(category2Options);
      } catch (error) {
        console.error('API 호출 에러:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 페이지 로드 시 한 번만 호출

  useEffect(() => {
    // 필터링 함수 정의
    const applyFilters = () => {
      let filtered = originalData;

      // 시도 명칭에 따른 필터링
      if (selectedSido) {
        filtered = filtered.filter(facility => facility['시도 명칭'] === selectedSido);
      }

      // 시군구 명칭에 따른 필터링
      if (selectedSigungu) {
        filtered = filtered.filter(facility => facility['시군구 명칭'] === selectedSigungu);
      }

      // 카테고리2에 따른 필터링
      if (selectedCategory2) {
        filtered = filtered.filter(facility => facility['카테고리2'] === selectedCategory2);
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [selectedSido, selectedSigungu, selectedCategory2, originalData]);

  const handleSidoChange = (event) => {
    setSelectedSido(event.target.value);
    setSelectedSigungu(''); // 시도가 바뀌면 시군구 선택 초기화
  };

  const handleSigunguChange = (event) => {
    setSelectedSigungu(event.target.value);
  };

  const handleCategory2Change = (event) => {
    setSelectedCategory2(event.target.value);
  };

  // 데이터를 3개씩 묶어서 렌더링하는 함수
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
                  <p className="card-text">카테고리2: {facility['카테고리2']}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div>
      <Navbar />
      <div className="data-container">
        <h2>반려동반 시설 정보</h2><br/>

        <div className="row">
          {/* 시도 명칭 선택 */}
          <div className="col-md-4">
            <div className="form-group">
              <label>시도 :</label>
              <select className="form-control" value={selectedSido} onChange={handleSidoChange}>
                <option value="">전체</option>
                {/* 시도 명칭 옵션들 */}
                {originalData.map((facility, index) => (
                  <option key={index} value={facility['시도 명칭']}>{facility['시도 명칭']}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 시군구 명칭 선택 */}
          <div className="col-md-4">
            <div className="form-group">
              <label>시군구 :</label>
              <select className="form-control" value={selectedSigungu} onChange={handleSigunguChange}>
                <option value="">전체</option>
                {/* 시군구 명칭 옵션들 */}
                {originalData
                  .filter(facility => facility['시도 명칭'] === selectedSido)
                  .map((facility, index) => (
                    <option key={index} value={facility['시군구 명칭']}>{facility['시군구 명칭']}</option>
                  ))}
              </select>
            </div>
          </div>

          {/* 카테고리2 선택 */}
          <div className="col-md-4">
            <div className="form-group">
              <label>카테고리 :</label>
              <select className="form-control" value={selectedCategory2} onChange={handleCategory2Change}>
                <option value="">전체</option>
                {/* 카테고리2 옵션들 */}
                {category2Options.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 데이터 표시 */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredData && filteredData.length > 0 ? (
          <div>
            {renderDataInColumns(filteredData)}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PetFacility;
