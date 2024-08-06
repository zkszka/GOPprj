import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap JS import
import './Home.css';

const Home = () => {
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleCircleClick = (event, content) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      content,
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX + rect.width / 2
    });
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.circle')) {
      setTooltip(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Carousel Section */}
      <div id="carouselExampleCaptions" className="carousel slide" style={{ maxWidth: '100%', margin: 'auto', height: '900px' }}>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={`${process.env.PUBLIC_URL}/img/cat-animals-cute-lovely-pet-whiskers-1419040-pxhere.com.jpg`} className="d-block w-100" alt="First slide" style={{ height: '900px' }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>새로운 가족을 찾고 있는 소중한 생명들, 함께 행복을 나눠요.</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/img/puppy-dog-animal-cute-looking-pet-633098-pxhere.com.jpg`} className="d-block w-100" alt="Second slide" style={{ height: '900px' }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>작은 관심이 큰 변화를 만듭니다. 유기동물들에게 따뜻한 손길을 건네주세요.</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/img/grass-play-sweet-puppy-dog-cute-732892-pxhere.com.jpg`} className="d-block w-100" alt="Third slide" style={{ height: '900px' }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>매일 매일의 사랑과 돌봄으로, 모든 동물이 행복할 수 있는 세상을 만듭니다.</h5>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="youtube-section">
        <h1>추천 동영상</h1>
        <div className="video-container">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/qglffq44cbc?si=Ae69skgrOkL_3qjB" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/HP0a4pkXM3Q?si=WmuYQrrJJYD1x8ug" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

      <div className="article-section">
        <div className="section1">
          <div className="circle-container">
            <div className="circle" onClick={(event) => handleCircleClick(event, '유기동물, 보호소를 검색할 수 있어요!')}>
              <img src={`${process.env.PUBLIC_URL}/img/crystal-tubens-wK9ZlJBjKhU-unsplash.jpg`} alt="Dog 1" />
            </div>
            <div className="circle" onClick={(event) => handleCircleClick(event, '실종동물을 등록하고 도움을 요청할 수 있어요!')}>
              <img src={`${process.env.PUBLIC_URL}/img/arjan-stalpers-8-sgismcDAQ-unsplash.jpg`} alt="Dog 2" />
            </div>
            <div className="circle" onClick={(event) => handleCircleClick(event, '반려동물 백과사전과 커뮤니티를 통해 팁을 얻어가세요!')}>
              <img src={`${process.env.PUBLIC_URL}/img/alvan-nee-egnAFVYS_h0-unsplash.jpg`} alt="Dog 3" />
            </div>
          </div>
        </div>

        <div className="section2">
          {/* 카드 1: 봉사 활동 정보 */}
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">봉사 활동 기회</h5>
              <p className="card-text">우리 보호소에서 봉사 활동에 참여해 주세요. 많은 도움이 필요합니다!</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">개인 / 기업 모두 참여 가능</li>
              <li className="list-group-item">장소: 1365 웹사이트</li>
              <li className="list-group-item">참여 방법: 전화 또는 웹사이트 등록</li>
            </ul>
            <div className="card-body card-link-container">
              <a href="https://www.1365.go.kr/vols/search.do?query=%EC%9C%A0%EA%B8%B0%EB%8F%99%EB%AC%BC" className="card-link" target="_blank" rel="noopener noreferrer">자세히 보기</a>
            </div>
          </div>

          {/* 카드 2: 후원 및 기부 안내 */}
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">유기동물 보호 기부 캠페인</h5>
              <p className="card-text">유기동물들의 삶을 변화시키는 기부 캠페인에 참여해 주세요. 여러분의 기부는 큰 도움이 됩니다!</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">금액: 자율</li>
              <li className="list-group-item">방법: 동물자유연대 사이트에서 온라인 기부</li>
              <li className="list-group-item">기부금 사용 계획: 동물 치료 및 보호</li>
            </ul>
            <div className="card-body card-link-container">
              <a href="https://www.animals.or.kr/support/room/2076" className="card-link" target="_blank" rel="noopener noreferrer">기부하기</a>
            </div>
          </div>

          {/* 카드 3: 애완동물 관리 팁 */}
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">반려동물 관리 팁</h5>
              <p className="card-text">반려동물을 올바르게 관리하기 위한 유용한 팁을 제공합니다. 소중한 반려동물을 더욱 건강하게 지켜주세요!</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">정기적인 건강 체크를 해주세요.</li>
              <li className="list-group-item">수의사와 주기적인 상담이 필요합니다.</li>
              <li className="list-group-item">온라인 교육 자료를 통해 반려동물에 관한 지식을 꾸준히 습득하세요.</li>
            </ul>
            <div className="card-body card-link-container">
              <a href="https://www.knia.or.kr/m/consumer/pet/pet_main" className="card-link" target="_blank" rel="noopener noreferrer">자세히 보기</a>
            </div>
          </div>
        </div>
      </div>

      {tooltip && (
        <div className="tooltip-box" style={{ top: tooltip.top, left: tooltip.left }}>
          <div className="tooltip-content">
            <p>{tooltip.content}</p>
          </div>
          <div className="tooltip-arrow"></div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
