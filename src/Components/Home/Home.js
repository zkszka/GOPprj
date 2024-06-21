import React from 'react';
import '../Main/Main.css'; // CSS 파일 import
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 부트스트랩 JavaScript import
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <div>
      {/* Section */}
      <div className="section-container">
        <div className="youtube-section">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/A1L9uEZ0xNE?si=KbPhhEBGdYlkgmOo"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
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
              애견동반정보
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer>

      </footer>
    
    </div>
  );
}

export default Home;
