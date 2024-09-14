import React, { useState } from "react";
import dbAxios from "../../api/axios"; // Axios 인스턴스
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";
import "./FindPW.css";

const FindPW = () => {
  const [email, setEmail] = useState(""); // 이메일 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handlePasswordResetRequest = async (event) => {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
  
    console.log("비밀번호 찾기 요청");
    console.log("Email:", email);
    
    try {
      const response = await dbAxios.post("/request-password-reset", { email }); // 비밀번호 재설정 요청
      
      if (response.status === 200) {
        alert("이메일이 전송되었습니다. 이메일을 확인해 주세요.");
      } else {
        alert("이메일이 존재하지 않거나 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 찾기 요청 오류:", error);
      alert("비밀번호 찾기 요청 실패! 다시 시도해주세요.");
    }
  };
  
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <div className="find-pw-container">
        <h2 className="find-pw-title">비밀번호 찾기</h2>
        <form onSubmit={handlePasswordResetRequest} className="find-pw-form">
          <div className="find-pw-form-group">
            <center><h3>비밀번호를 찾고자 하는 이메일을 입력해주세요.</h3></center><hr/>
            <label htmlFor="email" className="find-pw-label">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="find-pw-input"
            /><br/>
          </div>
          <button type="submit" className="find-pw-button">다음</button>
        </form>
      </div><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default FindPW;
