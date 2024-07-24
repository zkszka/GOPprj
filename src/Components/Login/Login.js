import React, { useState } from "react";
import dbAxios from "../../api/axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await dbAxios.post("/login", {
        email,
        password,
      });

      console.log("서버 응답:", response);

      if (response.status === 200) {
        const member = response.data;
        console.log("회원 데이터:", member);
        const username = member.username; // 회원 데이터에서 username을 추출하여 사용하는 부분

        alert(`안녕하세요, ${username}님!`);
        navigate("/"); // 로그인 성공 시 "/" 경로로 이동
      } else {
        alert("회원 정보가 일치하지 않습니다. 회원가입을 먼저 진행해 주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
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
        <form onSubmit={handleLogin}>
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
              autoComplete="current-password" // 브라우저에 저장된 비밀번호 제공을 유도하는 autoComplete 설정
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
      </div>
    </div>
  );
};

export default Login;
