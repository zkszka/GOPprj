import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';

const ShelterSearch = () => {
  const [searchParams, setSearchParams] = useState({
    serviceKey: 'rVXpgEeih%2BlnN57euuJZoWNcJUK2tMLSqy9Nd%2F7cpLHQzJ8to5pNWWTZSHh8luaU5f%2Blxc2zmZzMYu4gytBTrg%3D%3D',
    care_nm: '',
    numOfRows: '10',
    pageNo: '1',
    _type: 'json'
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const queryParams = `?${Object.keys(searchParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`).join('&')}`;
      const url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic';
      const response = await axios.get(url + queryParams);
      setData(response.data);
    } catch (error) {
      console.error('API 호출 에러:', error);
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>동물보호센터 검색</h1>
      <form onSubmit={handleSubmit}>
        <label>동물보호센터명:</label>
        <input type="text" name="care_nm" value={searchParams.care_nm} onChange={handleChange} />
        <br />
        <label>한 페이지 결과 수:</label>
        <input type="text" name="numOfRows" value={searchParams.numOfRows} onChange={handleChange} />
        <br />
        <label>페이지 번호:</label>
        <input type="text" name="pageNo" value={searchParams.pageNo} onChange={handleChange} />
        <br />
        <button type="submit">검색</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && data.response && data.response.body && data.response.body.items && data.response.body.items.item ? (
        <div>
          <h2>검색 결과</h2>
          <table border="1">
            <thead>
              <tr>
                <th>동물보호센터명</th>
                <th>관리기관명</th>
                <th>동물보호센터유형</th>
                <th>구조대상동물</th>
                <th>소재지도로명주소</th>
                <th>소재지번주소</th>
                <th>위도</th>
                <th>경도</th>
                <th>동물보호센터지정일자</th>
                <th>평일운영시작시각</th>
                <th>평일운영종료시각</th>
                <th>평일분양시작시각</th>
                <th>평일분양종료시각</th>
                <th>주말운영시작시각</th>
                <th>주말운영종료시각</th>
                <th>주말분양시작시각</th>
                <th>주말분양종료시각</th>
                <th>휴무일</th>
                <th>수의사인원수</th>
                <th>사양관리사인원수</th>
                <th>진료실수</th>
                <th>사육실수</th>
                <th>격리실수</th>
                <th>사료보관실수</th>
                <th>구조운반용차량보유대수</th>
                <th>전화번호</th>
                <th>데이터기준일자</th>
              </tr>
            </thead>
            <tbody>
              {data.response.body.items.item.map((item, index) => (
                <tr key={index}>
                  <td>{item.careNm}</td>
                  <td>{item.orgNm}</td>
                  <td>{item.divisionNm}</td>
                  <td>{item.saveTrgtAnimal}</td>
                  <td>{item.careAddr}</td>
                  <td>{item.jibunAddr}</td>
                  <td>{item.lat}</td>
                  <td>{item.lng}</td>
                  <td>{item.dsignationDate}</td>
                  <td>{item.weekOprStime}</td>
                  <td>{item.weekOprEtime}</td>
                  <td>{item.weekCellStime}</td>
                  <td>{item.weekCellEtime}</td>
                  <td>{item.weekendOprStime}</td>
                  <td>{item.weekendOprEtime}</td>
                  <td>{item.weekendCellStime}</td>
                  <td>{item.weekendCellEtime}</td>
                  <td>{item.closeDay}</td>
                  <td>{item.vetPersonCnt}</td>
                  <td>{item.specsPersonCnt}</td>
                  <td>{item.medicalCnt}</td>
                  <td>{item.breedCnt}</td>
                  <td>{item.quarabtineCnt}</td>
                  <td>{item.feedCnt}</td>
                  <td>{item.transCarCnt}</td>
                  <td>{item.careTel}</td>
                  <td>{item.dataStdDt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data found.</p>
      )}
      <Footer/>
    </div>
  );
};

export default ShelterSearch;
