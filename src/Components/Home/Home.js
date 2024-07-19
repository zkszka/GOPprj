import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import '../Main/Main.css'; // 추가된 CSS 파일

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* Section */}
      <div className="section-container">

        <div id="carouselExampleCaptions" className="carousel slide" style={{ maxWidth: '100%', margin: 'auto' , height: '900px'}}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" className="active" aria-current="true"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item" data-bs-interval="10000">
              <img src={`${process.env.PUBLIC_URL}/img/cat-animals-cute-lovely-pet-whiskers-1419040-pxhere.com.jpg`} className="d-block w-100" alt='First slide' height='900px'/>
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div className="carousel-item active" data-bs-interval="10000">
            <img src={`${process.env.PUBLIC_URL}/img/puppy-dog-animal-cute-looking-pet-633098-pxhere.com.jpg`} className="d-block w-100" alt='Second slide' height='900px'/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="10000">
            <img src={`${process.env.PUBLIC_URL}/img/grass-play-sweet-puppy-dog-cute-732892-pxhere.com.jpg`} className="d-block w-100" alt='Second slide' height='900px'/>
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
            입양정보
          </div>
          <div className="section2">
            실종정보
          </div>
          <div className="section3">
            <div className="section3-1">
              봉사안내
            </div>
            <div className="section3-2">
              <h2>애견 동반 시설 안내</h2>
              <p>주변의 애견 동반 가능한 곳들을 살펴보세요.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
