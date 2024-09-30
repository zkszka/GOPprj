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
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 현재 페이지 인덱스 상태

  const sectionRefs = useRef([]);
  const navigate = useNavigate(); // useNavigate 훅을 이용하여 페이지 이동 함수 가져오기

  // 페이지별 표시할 cat_id 목록
  const pages = [
    [], // 첫 번째 페이지는 빈 배열
    [2440, 2457, 2458],
    [2441, 2460],
    [2442, 2462],
    [2443, 2464],
    [2444, 2466],
    [2445, 2468],
    [2446, 2470],
    [2447, 2472, 2473],
    [2448, 2475, 2476],
    [2449, 2478] // 마지막 페이지
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dbAxios.get('/cats/all');
        console.log('Received data:', response.data);

        if (Array.isArray(response.data)) {
          setCatSections(response.data);
          setLoading(false);
        } else {
          console.error('Unexpected response data type');
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

  const getCurrentPageData = () => {
    const ids = pages[currentPageIndex];
    return catSections.filter(section => ids.includes(section.id));
  };

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
        setCurrentPageIndex(0); // 카테고리 변경 시 페이지 인덱스 초기화
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
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(prevIndex => prevIndex + 1);
    } else {
      console.log('Last page reached');
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prevIndex => prevIndex - 1);
    } else {
      console.log('First page reached');
    }
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
        <h2 className="encyclopedia-title">{activeButton === 'cat' ? '고양이 백과사전' : '강아지 백과사전'}</h2>

        {/* 첫 페이지 */}
        {currentPageIndex === 0 && (
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/img/flower-wildlife-pet-fur-beak-cat-562078-pxhere.com.jpg`}
              className="d-block w-100"
              alt="First slide"
              height="500px"
            />
            <div className="speech-bubble">
              <p>
                이 곳에서는 {activeButton === 'cat' ? '고양이' : '강아지'}에 관한 다양한 정보를 확인할 수 있습니다. 다음 장 버튼을 클릭하여 다음 페이지로 이동하세요.
              </p>
            </div>
          </div>
        )}

        {/* 특정 id 데이터 페이지 */}
        <div className="cat-info">
          {getCurrentPageData().map((section, index) => (
            <div key={index} ref={sectionRefs.current[index]}>
              <h3>{section.name}</h3>
              <p>{section.description}</p>
            </div>
          ))}
        </div>

        {/* 페이지 내비게이션 */}
        <div className="navigation">
          {currentPageIndex > 0 && (
            <button className="navigation-btn" onClick={goToPreviousPage}>
              이전 장
            </button>
          )}
          {currentPageIndex < pages.length - 1 && (
            <button className="navigation-btn" onClick={goToNextPage}>
              다음 장
            </button>
          )}
          {currentPageIndex === pages.length - 1 && (
            <button className="navigation-btn" onClick={() => setCurrentPageIndex(0)}>
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
