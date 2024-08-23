import React, { useState } from "react";
import dbAxios from "../../api/axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";

const Login = () => {
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
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit">로그인</button>
        </form>
      </div>
      <div className="login-find">
        <span className="find-id">
          <a href="#">아이디 찾기</a>
        </span>
        |
        <span className="find-pw">
          <a href="#">비밀번호 찾기</a>
        </span>
        |
        <span className="signup">
          <Link to="/signup">회원가입</Link>
        </span>
      </div><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default Login;
