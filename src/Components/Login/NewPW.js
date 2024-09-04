import React, { useState } from "react";
import dbAxios from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";
import "./NewPW.css";

const NewPW = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 토큰을 가져옵니다.
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await dbAxios.post("/api/reset-password", { token, password });

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/login");
      } else {
        alert("비밀번호 재설정 요청이 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("비밀번호 재설정 오류:", error);
      alert("비밀번호 재설정 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <Header />
      <div className="new-pw-container">
        <h2 className="new-pw-title">비밀번호 재설정</h2>
        <form onSubmit={handlePasswordReset} className="new-pw-form">
          <div className="new-pw-form-group">
            <label htmlFor="password" className="new-pw-label">새 비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="new-pw-input"
            /><br/>
          </div>
          <div className="new-pw-form-group">
            <label htmlFor="confirmPassword" className="new-pw-label">비밀번호 확인:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="new-pw-input"
            /><br/>
          </div>
          {error && <p className="new-pw-error">{error}</p>}
          <button type="submit" className="new-pw-button">비밀번호 변경</button>
        </form>
      </div><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default NewPW;
