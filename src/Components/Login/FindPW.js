import React, { useState } from "react";
import dbAxios from "../../api/axios";
import "./FindPW.css";
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";

const FindPW = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    console.log("로그인 시도");
    console.log("Email:", email);
    console.log("Password:", password);
  
    try {
      const response = await dbAxios.post("/login", { // 수정된 경로
        email,
        password,
      });
  
      console.log("서버 응답:", response);
  
      if (response.headers["content-type"].includes("application/json")) {
        const { data } = response;
        const username = data.username; // Assuming data.username is returned by backend
        if (username) {
          alert(`안녕하세요, ${username}님!`);
          navigate("/");
        } else {
          alert("회원 정보가 일치하지 않습니다. 회원가입을 먼저 진행해 주세요.");
        }
      } else {
        console.error("서버에서 JSON 형식의 데이터를 반환하지 않았습니다.");
        alert("회원 정보가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error.response || error.message || error);
      alert("로그인 실패! 다시 시도해주세요.");
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
        <form onSubmit={handleLogin} className="find-pw-form">
          <div className="find-pw-form-group">
            <center><h3>찾고자 하는 아이디를 입력해주세요.</h3></center><hr/>
            <label htmlFor="email" className="find-pw-label">Email (Id) :</label>
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
      </div>
      <div className="find-pw-find">
        <span className="find-pw-id">
            아이디가 기억에 나지 않는다면? 
          <a href="#" className="find-pw-link">아이디 찾기</a>
        </span>
      </div><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default FindPW;
