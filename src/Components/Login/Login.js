import React, { useState, useEffect } from "react";
import dbAxios from "../../api/axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoginUrl, setGoogleLoginUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 구글 로그인 URL을 가져와서 상태를 업데이트
    const fetchGoogleLoginUrl = async () => {
      try {
        const response = await dbAxios.get("/v1/oauth2/google");
        setGoogleLoginUrl(response.data.url);
      } catch (error) {
        console.error("구글 로그인 URL 가져오기 실패:", error);
      }
    };
    fetchGoogleLoginUrl();
  }, []);

  const handleSiteLogin = async (event) => {
    event.preventDefault();

    console.log("사이트 로그인 시도");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // 사이트 자체 로그인 요청
      const response = await dbAxios.post("/login", { email, password }, { withCredentials: true });

      console.log("서버 응답:", response);

      if (response.headers["content-type"].includes("application/json")) {
        const { data } = response;
        const username = data.username; // 서버가 반환하는 사용자 이름

        if (username) {
          // 사용자 이름을 포함하여 환영 메시지 표시
          alert(`안녕하세요, ${username}님!`);

          // 메인 페이지로 리다이렉트
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

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl; // 구글 로그인 페이지로 리다이렉트
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        
        {/* 사이트 자체 로그인 폼 */}
        <form onSubmit={handleSiteLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email (Id) :</label>
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
          <button type="submit" className="site-login-button">로그인</button>
        </form>
        
        <br />

        {/* 구글 로그인 버튼 */}
        {googleLoginUrl && (
          <div>
            <button onClick={handleGoogleLogin}>
              <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" alt="Google Sign In" />
            </button>
          </div>
        )}
      </div>
      
      <div className="login-find">
        <span className="find-pw">
          <Link to="/login/find_pw">비밀번호 찾기</Link>
        </span>
        |
        <span className="signup">
          <Link to="/signup">회원가입</Link>
        </span>
      </div>
      <br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default Login;
