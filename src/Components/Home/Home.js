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
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/img/puppy-dog-animal-cute-looking-pet-633098-pxhere.com.jpg`} className="d-block w-100" alt="Second slide" style={{ height: '900px' }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/img/grass-play-sweet-puppy-dog-cute-732892-pxhere.com.jpg`} className="d-block w-100" alt="Third slide" style={{ height: '900px' }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
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
        <iframe width="560" height="315" src="https://www.youtube.com/embed/qglffq44cbc?si=Ae69skgrOkL_3qjB" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>

      <div className="article-section">
        <div className="section1">
          <div className="circle-container">
            <div className="circle" onClick={(event) => handleCircleClick(event, '이것은 강아지 1의 기능 설명입니다.')}>
              <img src={`${process.env.PUBLIC_URL}/img/crystal-tubens-wK9ZlJBjKhU-unsplash.jpg`} alt="Dog 1" />
            </div>
            <div className="circle" onClick={(event) => handleCircleClick(event, '이것은 강아지 2의 기능 설명입니다.')}>
              <img src={`${process.env.PUBLIC_URL}/img/arjan-stalpers-8-sgismcDAQ-unsplash.jpg`} alt="Dog 2" />
            </div>
            <div className="circle" onClick={(event) => handleCircleClick(event, '이것은 강아지 3의 기능 설명입니다.')}>
              <img src={`${process.env.PUBLIC_URL}/img/alvan-nee-egnAFVYS_h0-unsplash.jpg`} alt="Dog 3" />
            </div>
          </div>
        </div>

        <div className="section2">
          {/* <h2>유기동물 보호를 위한 카드</h2> */}
          {/* 카드 1: 봉사 활동 정보 */}
          <div className="card" style={{ width: '18rem' }}>
            <img src={`${process.env.PUBLIC_URL}/img/volunteer.jpg`} className="card-img-top" alt="Volunteer Activity" />
            <div className="card-body">
              <h5 className="card-title">봉사 활동 기회</h5>
              <p className="card-text">우리 보호소에서 봉사 활동에 참여해 주세요. 많은 도움이 필요합니다!</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">일정: 매주 토요일</li>
              <li className="list-group-item">장소: 서울 보호소</li>
              <li className="list-group-item">참여 방법: 전화 또는 웹사이트 등록</li>
            </ul>
            <div className="card-body">
              <a href="/volunteer" className="card-link">자세히 보기</a>
            </div>
          </div>

          {/* 카드 2: 후원 및 기부 안내 */}
          <div className="card" style={{ width: '18rem' }}>
            <img src={`${process.env.PUBLIC_URL}/img/donation.jpg`} className="card-img-top" alt="Donation Campaign" />
            <div className="card-body">
              <h5 className="card-title">유기동물 보호 기부 캠페인</h5>
              <p className="card-text">유기동물 보호를 위한 기부 캠페인에 참여해 주세요. 여러분의 기부는 큰 도움이 됩니다!</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">기부 금액: 자율</li>
              <li className="list-group-item">기부 방법: 온라인 기부</li>
              <li className="list-group-item">기부 사용 계획: 동물 치료 및 보호</li>
            </ul>
            <div className="card-body">
              <a href="/donate" className="card-link">기부하기</a>
            </div>
          </div>

          {/* 카드 3: 애완동물 관리 팁 */}
          <div className="card" style={{ width: '18rem' }}>
            <img src={`${process.env.PUBLIC_URL}/img/pet-care-tips.jpg`} className="card-img-top" alt="Pet Care Tips" />
            <div className="card-body">
              <h5 className="card-title">애완동물 관리 팁</h5>
              <p className="card-text">애완동물을 올바르게 관리하기 위한 유용한 팁을 제공합니다. 소중한 정보를 확인해 보세요.</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">관리 방법: 정기적인 건강 체크</li>
              <li className="list-group-item">유용한 자원: 수의사와 상담</li>
              <li className="list-group-item">추가 자료: 온라인 교육 자료</li>
            </ul>
            <div className="card-body">
              <a href="/pet-care-tips" className="card-link">자세히 보기</a>
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
