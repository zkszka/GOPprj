import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Main/Main.css'; // CSS 파일 import
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 부트스트랩 JavaScript import
import Navbar from '../Navbar/Navbar';

const AdoptionInfo = () => {
  const [data, setData] = useState(null); // API 데이터를 저장할 상태
  const [selectedOrg, setSelectedOrg] = useState(''); // 선택된 시도명 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceKey = 'rVXpgEeih%2BlnN57euuJZoWNcJUK2tMLSqy9Nd%2F7cpLHQzJ8to5pNWWTZSHh8luaU5f%2Blxc2zmZzMYu4gytBTrg%3D%3D';
        const queryParams = `?${encodeURIComponent('serviceKey')}=${serviceKey}&${encodeURIComponent('numOfRows')}=${encodeURIComponent('30')}&${encodeURIComponent('pageNo')}=${encodeURIComponent('1')}&${encodeURIComponent('_type')}=${encodeURIComponent('json')}`;
        const url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido';

        const response = await axios.get(url + queryParams);
        console.log('API 호출 성공:', response.data);

        // 받아온 데이터를 상태에 저장
        setData(response.data);
      } catch (error) {
        console.error('API 호출 에러:', error);
        // 에러 처리 로직 추가
      }
    };

    fetchData();
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행하도록 빈 배열 전달

  const handleSelectChange = (e) => {
    setSelectedOrg(e.target.value);
  };

  return (
    <div>
      <Navbar/>
      {/* 데이터를 보여주는 컴포넌트를 추가 */}
      <div className="data-container">
        {data ? (
          <div>
            <h2>API 데이터</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <select value={selectedOrg} onChange={handleSelectChange}>
              <option value="">시도 선택</option>
              {data.response.body.items.item.map((item, index) => (
                <option key={index} value={item.orgdownNm}>{item.orgdownNm}</option>
              ))}
            </select>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* Footer */}
      <footer>
        {/* 푸터 내용 추가 */}
      </footer>
    </div>
  );
}

export default AdoptionInfo;
