import { jwtDecode } from 'jwt-decode'; // 직접 가져오기

export const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("JWT 디코딩 오류:", error);
    return null;
  }
};
