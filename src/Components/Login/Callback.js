import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dbAxios from "../../api/axios";
import "./Callback.css";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');

      if (authCode) {
        try {
          const response = await dbAxios.get(`/v1/oauth2/google/callback?code=${authCode}`);
          const { username } = response.data;

          if (username) {
            alert(`안녕하세요, ${username}님!`);
            navigate("/"); // 메인 페이지로 이동
          } else {
            alert('로그인 정보가 잘못되었습니다. 다시 시도해 주세요.');
            navigate("/login"); // 로그인 페이지로 이동
          }
        } catch (error) {
          console.error('로그인 처리 오류:', error);
          alert('로그인 실패! 다시 시도해 주세요.');
          navigate("/login"); // 로그인 페이지로 이동
        }
      } else {
        alert('잘못된 요청입니다.');
        navigate("/login"); // 로그인 페이지로 이동
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return null; // 이 컴포넌트는 화면에 아무것도 렌더링하지 않습니다.
};

export default Callback;
