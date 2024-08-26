import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router에서 useNavigate 가져오기
import dbAxios from '../../api/axios';
import Footer from '../Navbar/Footer';
import Navbar from '../Navbar/Navbar';
import './CatEncyclopedia.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CatEncyclopedia = () => {
  const [catSections, setCatSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState('cat'); // 초기 상태: 고양이 버튼 활성화
  const [currentPageId, setCurrentPageId] = useState(null); // 현재 페이지 데이터의 id 상태

  const sectionRefs = useRef([]);
  const navigate = useNavigate(); // useNavigate 훅을 이용하여 페이지 이동 함수 가져오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dbAxios.get('/cats/all');
        console.log('Received data:', response.data);

        if (Array.isArray(response.data)) {
          const sections = response.data; // 예제에서는 'text'라는 필드를 가정합니다.
          setCatSections(sections);
          setLoading(false);
        } else {
          throw new Error('Unexpected response data type');
        }
      } catch (error) {
        console.error('API 호출 에러:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    sectionRefs.current = Array(catSections.length).fill().map((_, index) => sectionRefs.current[index] || React.createRef());
  }, [catSections]);

  const scrollToSection = (index) => {
    if (sectionRefs.current[index] && sectionRefs.current[index].current) {
      sectionRefs.current[index].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleCategoryChange = async (category) => {
    try {
      let endpoint = category === 'dog' ? '/dogs/all' : '/cats/all';
      setActiveButton(category);
      setLoading(true);

      const response = await dbAxios.get(endpoint);
      console.log(`Received data for ${category}:`, response.data);

      if (Array.isArray(response.data)) {
        setCatSections(response.data);
        setCurrentPageId(null); // 카테고리 변경 시 현재 페이지 데이터 id 초기화
        setLoading(false);

        // 강아지 버튼 클릭 시 /encyclopedia/dog로 페이지 이동
        if (category === 'dog') {
          navigate('/encyclopedia/dog');
        }
      } else {
        throw new Error('Unexpected response data type');
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
      setLoading(false);
    }
  };

  const goToNextPage = () => {
    // id가 27인 데이터를 찾아서 currentPageId 상태 업데이트
    const nextPageData = catSections.find(section => section.id === 27);
    if (nextPageData) {
      setCurrentPageId(nextPageData.id);
      scrollToSection(nextPageData.id - 1); // 페이지 내에서 해당 id로 스크롤
    } else {
      console.log('Data with id 27 not found in catSections array.');
    }
  };

  const goToPreviousPage = () => {
    // 이전 페이지로 이동하는 로직 추가
  };

  return (
    <div>
      <Navbar />
      <hr />
      <br />
      <br />
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
        <h2 className="encyclopedia-title">고양이 백과사전</h2>

        {/* 첫 번째 페이지 */}
        <div style={{ display: currentPageId === null ? 'block' : 'none' }}>
          <img
            src={`${process.env.PUBLIC_URL}/img/flower-wildlife-pet-fur-beak-cat-562078-pxhere.com.jpg`}
            className="d-block w-100"
            alt="First slide"
            height="500px"
          />
          <div className="speech-bubble">
            <p>
              이 곳에서는 고양이에 관한 다양한 정보를 확인할 수 있습니다. 다음 장 버튼을 클릭하여 다음 페이지로 이동하세요.
            </p>
          </div>
          <div className="first-page-buttons">
            {currentPageId === null && (
              <button className="navigation-btn" onClick={goToNextPage}>
                다음 장
              </button>
            )}
          </div>
        </div>

        {/* 특정 id 데이터 페이지 */}
        <div className="cat-info">
          {catSections.map((section, index) => (
            <div key={index} ref={sectionRefs.current[index]} style={{ display: currentPageId === section.id ? 'block' : 'none' }}>
              <h3>{section.name}</h3>
              <p>{section.description}</p>
            </div>
          ))}
        </div>

        {/* 페이지 내비게이션 */}
        <div className="navigation">
          {/* 이전 페이지 버튼 로직 */}
          {currentPageId !== null && (
            <button className="navigation-btn" onClick={() => setCurrentPageId(null)}>
              처음으로
            </button>
          )}
        </div>
      </div>

      <br />
      <br /><br /><br />
      <Footer />
    </div>
  );
};

export default CatEncyclopedia;
