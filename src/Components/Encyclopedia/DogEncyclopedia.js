import React, { useState, useEffect, useRef } from 'react';
import dbAxios from '../../api/axios';
import Footer from '../Navbar/Footer';
import Navbar from '../Navbar/Navbar';
import './DogEncyclopedia.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DogEncyclopedia = () => {
  const [dogSections, setDogSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState('dog'); // 초기 상태: 강아지 버튼 활성화

  // Refs를 사용하여 강아지와 고양이 섹션의 위치를 저장할 배열 생성
  const sectionRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dbAxios.get('/dogs/all');
        console.log('Received data:', response.data);

        // id가 4부터 22까지인 데이터 필터링
        const filteredData = response.data.filter(dog => dog.id >= 4 && dog.id <= 22);

        // '■'을 기준으로 섹션을 나누어 배열에 저장
        const sections = [];
        let startIndex = 0;
        for (let i = 0; i < filteredData.length; i++) {
          if (filteredData[i].description.startsWith('■')) {
            sections.push(filteredData.slice(startIndex, i));
            startIndex = i;
          }
        }
        // 마지막 섹션 추가
        sections.push(filteredData.slice(startIndex));

        // 받은 데이터를 상태에 설정합니다.
        setDogSections(sections);
        setLoading(false);
      } catch (error) {
        console.error('API 호출 에러:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Refs를 초기화하고 섹션마다 위치를 저장합니다.
  useEffect(() => {
    sectionRefs.current = dogSections.map((_, index) => sectionRefs.current[index] || React.createRef());
  }, [dogSections]);

  const scrollToSection = (index) => {
    if (sectionRefs.current[index] && sectionRefs.current[index].current) {
      sectionRefs.current[index].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleCategoryChange = (category) => {
    if (category === 'dog') {
      setActiveButton('dog');
      setCurrentIndex(0); // 강아지 섹션으로 이동
      scrollToSection(0);
    } else if (category === 'cat') {
      setActiveButton('cat');
      setCurrentIndex(1); // 고양이 섹션으로 이동
      scrollToSection(1);
    }
  };

  const goToNextPage = () => {
    // 다음 페이지로 이동
    if (currentIndex < dogSections.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollToSection(currentIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    // 이전 페이지로 이동
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToSection(currentIndex - 1);
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
        <div className="dog-info">
          {dogSections.map((section, index) => (
            <div key={index} ref={sectionRefs.current[index]} style={{ display: index === currentIndex ? 'block' : 'none' }}>
              {/* 해당 섹션의 내용을 표시 */}
              {section.map((dog, idx) => (
                <div key={idx}>
                  {dog.description.startsWith('■') && <p>{dog.description}</p>}
                  {!dog.description.startsWith('■') && <p>{dog.description}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="navigation" style={{ textAlign: 'right' }}>
          {/* 이전 장 버튼 */}
          {currentIndex !== 0 && <button className="navigation-btn" onClick={goToPreviousPage}>이전 장</button>}
          {/* 다음 장 버튼 */}
          {currentIndex !== dogSections.length - 1 && <button className="navigation-btn" onClick={goToNextPage}>다음 장</button>}
          {/* 마지막 페이지일 때는 처음으로 버튼 보이기 */}
          {currentIndex === dogSections.length - 1 && <button className="navigation-btn" onClick={() => setCurrentIndex(0)}>처음으로</button>}
        </div>
      </div>
      <br /><br />
      <Footer />
    </div>
  );
}

export default DogEncyclopedia;
