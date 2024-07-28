import axios from 'axios';

const dbAxios = axios.create({
  baseURL: 'http://localhost:9977/api', // 실제 API 서버 주소 확인
  withCredentials: true, // 세션 쿠키를 포함
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
dbAxios.interceptors.request.use(
  (config) => {
    // 요청 전에 추가적인 작업을 수행할 수 있습니다.
    // 예: 인증 토큰 추가, 요청 로깅 등
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
dbAxios.interceptors.response.use(
  (response) => {
    // 응답 데이터 전에 추가적인 작업을 수행할 수 있습니다.
    return response;
  },
  (error) => {
    // 응답 오류 처리
    if (error.response) {
      // 서버가 응답을 반환했지만 상태 코드가 오류를 포함하는 경우
      console.error('응답 오류:', error.response.data);
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error('요청 오류:', error.request);
    } else {
      // 오류를 발생시킨 이유
      console.error('설정 오류:', error.message);
    }
    return Promise.reject(error);
  }
);

export default dbAxios;
