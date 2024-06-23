import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/Navbar';
import './AnimalNotice.css';
import Footer from '../Navbar/Footer';

const AnimalNotice = () => {
  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useState({
    bgnde: '20230101',
    endde: '20230630',
    upkind: '417000',
    upr_cd: '6110000',
    numOfRows: '16',
    pageNo: '1',
    _type: 'json'
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  const sidoCodes = {
    '서울특별시': '6110000',
    '부산광역시': '6260000',
    '대구광역시': '6270000',
    '인천광역시': '6280000',
    '광주광역시': '6290000',
    '대전광역시': '6300000',
    '울산광역시': '6310000',
    '세종특별자치시': '5690000',
    '경기도': '6410000',
    '강원도': '6420000',
    '충청북도': '6430000',
    '충청남도': '6440000',
    '전라북도': '6450000',
    '전라남도': '6460000',
    '경상북도': '6470000',
    '경상남도': '6480000',
    '제주특별자치도': '6500000'
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const serviceKey = 'rVXpgEeih%2BlnN57euuJZoWNcJUK2tMLSqy9Nd%2F7cpLHQzJ8to5pNWWTZSHh8luaU5f%2Blxc2zmZzMYu4gytBTrg%3D%3D';
      const queryParams = `?${encodeURIComponent('serviceKey')}=${serviceKey}&${encodeURIComponent('bgnde')}=${encodeURIComponent(searchParams.bgnde)}&${encodeURIComponent('endde')}=${encodeURIComponent(searchParams.endde)}&${encodeURIComponent('upkind')}=${encodeURIComponent(searchParams.upkind)}&${encodeURIComponent('upr_cd')}=${encodeURIComponent(searchParams.upr_cd)}&${encodeURIComponent('numOfRows')}=${encodeURIComponent(searchParams.numOfRows)}&${encodeURIComponent('pageNo')}=${encodeURIComponent(currentPage)}&${encodeURIComponent('_type')}=${encodeURIComponent(searchParams._type)}`;
      const url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic';

      const response = await axios.get(url + queryParams);
      console.log('API 호출 성공:', response.data);

      setData(response.data);
    } catch (error) {
      console.error('API 호출 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'upr_cd') {
      setSearchParams({
        ...searchParams,
        upr_cd: sidoCodes[value]
      });
    } else {
      setSearchParams({
        ...searchParams,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    await fetchData();
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // currentPage가 변경될 때마다 fetchData 호출

  return (
    <div>
      <Navbar />
      <div className="data-container">
        <h2>유기동물조회</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row align-items-end">
            <div className="col-md-2 mb-3">
              <label htmlFor="upr_cd">시도명</label>
              <select className="form-control" id="upr_cd" name="upr_cd" value={Object.keys(sidoCodes).find(key => sidoCodes[key] === searchParams.upr_cd)} onChange={handleInputChange}>
                {Object.keys(sidoCodes).map((sidoName) => (
                  <option key={sidoCodes[sidoName]} value={sidoName}>{sidoName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="bgnde">공고 시작일</label>
              <input type="text" className="form-control" id="bgnde" name="bgnde" value={searchParams.bgnde} onChange={handleInputChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="endde">공고 종료일</label>
              <input type="text" className="form-control" id="endde" name="endde" value={searchParams.endde} onChange={handleInputChange} />
            </div>
            <div className="col-md-2 mb-3">
              <label htmlFor="upkind">동물 종류</label>
              <select className="form-control" id="upkind" name="upkind" value={searchParams.upkind} onChange={handleInputChange}>
                <option value="417000">강아지</option>
                <option value="422400">고양이</option>
                <option value="429900">기타</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-pink btn-block">검색</button>
            </div>
          </div>
        </form><br/><br/><hr/>

        {loading ? (
          <p>Loading...</p>
        ) : data && data.response.body.items.item ? (
          <div> <br/>
            <h2>유기동물 정보</h2>
            <div className="row">
              {data.response.body.items.item.map((item, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <div className="card h-100">
                    <img src={item.popfile} className="card-img-top animal-image" alt="유기동물 사진" />
                    <div className="card-body">
                      <h5 className="card-title">종: {item.kindCd}</h5>
                      <p className="card-text">색상: {item.colorCd}</p>
                      <p className="card-text">나이: {item.age}</p>
                      <p className="card-text">보호소명: {item.careNm}</p>
                      <p className="card-text">보호소 전화번호: {item.careTel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 페이지네이션 추가 */}
            <nav>
              <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>이전</button>
                </li>
                {/* 페이지 번호를 표시 */}
                <li className="page-item"><button className="page-link" onClick={() => handlePageChange(1)}>1</button></li>
                <li className="page-item"><button className="page-link" onClick={() => handlePageChange(2)}>2</button></li>
                {/* 필요한 만큼 페이지 번호를 추가 */}
                {/* 예를 들어, 현재 페이지가 1일 때는 1, 2, 3, 4, 5를 보여줄 수 있습니다. */}
                <li className={`page-item ${currentPage === 2 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>다음</button>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <p>No data found.</p>
        )}
      </div><br/><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default AnimalNotice;
