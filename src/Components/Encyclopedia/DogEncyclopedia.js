import React from 'react';
import Footer from '../Navbar/Footer';
import Navbar from '../Navbar/Navbar';
import './DogEncyclopedia.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 



const DogEncyclopedia = () => {
  return (
    <div>
     <Navbar/> <hr/>
      <div className="encyclopedia-container">
        <h2 className="encyclopedia-title">강아지 백과사전</h2>
        <p className="encyclopedia-description">
          강아지의 특징, 종류, 행동 패턴 등에 대한 정보 추가
        </p>
        <div className="navigation">
          <button className="navigation-btn">이전 장</button>
          <button className="navigation-btn">다음 장</button>
        </div>
      </div><br/><br/>
      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default DogEncyclopedia;