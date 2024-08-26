import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import dbAxios from '../../api/axios';
import Footer from '../Navbar/Footer';
import Navbar from '../Navbar/Navbar';
import './DogEncyclopedia.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DogEncyclopedia = () => {
  const [dogData, setDogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState('dog'); // 초기 상태: 강아지 버튼 활성화

  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dbAxios.get('/dogs/all');
        console.log('Received data:', response.data);

        // id가 4부터 22까지인 데이터 필터링
        const filteredData = response.data.filter(dog => dog.id >= 4 && dog.id <= 22);

        // 받은 데이터를 상태에 설정합니다.
        setDogData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('API 호출 에러:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    if (category === 'dog') {
      setActiveButton('dog');
    } else if (category === 'cat') {
      setActiveButton('cat');
      // /encyclopedia/cat 페이지로 이동
      navigate('/encyclopedia/cat');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <hr /><br/><br/>
      <div className="category-buttons" style={{ marginBottom: '20px' }}>
        {/* 강아지와 고양이 카테고리 선택 버튼 */}
        <button
          className={`category-btn ${activeButton === 'dog' ? 'category-btn-dog' : ''}`}
          onClick={() => handleCategoryChange('dog')}
        >
          강아지
        </button>
        <button
          className={`category-btn ${activeButton === 'cat' ? 'category-btn-cat' : ''}`}
          onClick={() => handleCategoryChange('cat')}
        >
          고양이
        </button>
      </div>
      
      <div className="encyclopedia-container">
        <h2 className="encyclopedia-title">강아지 백과사전</h2>
        
        {/* 첫 번째 페이지 */}
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/img/alvan-nee-T-0EW-SEbsE-unsplash.jpg`}
            className="d-block w-100"
            alt="First slide"
            height="500px" // 이미지 높이 조정
          />
          <div className="speech-bubble">
            <p>
              이 곳에서는 강아지에 관한 다양한 정보를 확인할 수 있습니다. 물론 옆에 고양이 정보도 알 수 있어요.
            </p>
          </div>
        </div>

        <div className="dog-info">
          {/* 전체 데이터를 보여줍니다. */}
          {dogData.map((dog, idx) => (
            <div key={idx}>
              <p>{dog.description}</p>
            </div>
          ))}
        </div>
        
        <br /><br />
        
      </div><br /><br /><br /><br /><Footer />
    </div>
  );
}

export default DogEncyclopedia;
