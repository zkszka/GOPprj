import React, { useEffect, useState } from 'react';
import '../Main/Main.css'; // CSS 파일 import
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 부트스트랩 JavaScript import
import Navbar from '../Navbar/Navbar';

const AdoptionInfo = () => {
  

  return (
    <div>
      <Navbar />
      {/* 데이터를 보여주는 테이블 */}
      <div className="data-container">
       
      </div>
      {/* Footer */}
      <footer>
        {/* 푸터 내용 추가 */}
      </footer>
    </div>
  );
}

export default AdoptionInfo;
