import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo.png';
import dbAxios from "../../api/axios";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부를 저장할 상태
    const navigate = useNavigate();

    useEffect(() => {
        dbAxios.get('/check-session', { withCredentials: true })
            .then(response => {
                console.log("서버 응답:", response); // 응답 전체를 콘솔에 출력
                console.log("서버 응답 데이터:", response.data); // 응답 데이터만 출력
                setIsLoggedIn(true);
                setIsAdmin(response.data.role === 'ADMIN'); // 역할에 따라 관리자 여부 설정
            })
            .catch(error => {
                console.error("로그인 상태 확인 오류:", error);
                setIsLoggedIn(false);
                setIsAdmin(false);
            });
    }, []);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            dbAxios.post('/logout', {}, { withCredentials: true })
                .then(response => {
                    console.log("로그아웃 응답:", response); // 로그아웃 응답을 콘솔에 출력
                    setIsLoggedIn(false);
                    setIsAdmin(false); // 로그아웃 시 관리자 상태도 초기화
                    navigate('/'); // 홈 페이지로 리디렉션
                })
                .catch(error => {
                    console.error("로그아웃 오류:", error);
                    alert("로그아웃 중 오류가 발생했습니다.");
                });
        }
    };

    return (
        <div>
            {/* Header */}
            <nav>
                <div className="nav-container">
                    <Link className="nav-home" to="/">Home</Link>
                    <div className="nav-title">
                        <p>For Animals' Happiness</p>
                    </div>
                    <div className="nav-link">
                        {isAdmin && (
                            <Link className="nav-item" style={{ marginRight: '20px' }} to="/admin">Member Management</Link>
                        )}
                        {isLoggedIn ? (
                            <span 
                                className="nav-item"
                                onClick={handleLogout} 
                            >
                                Logout
                            </span>
                        ) : (
                            <>
                                <Link className="nav-item" style={{ marginRight: '20px' }} to="/login">Login</Link>
                                <Link className="nav-item" to="/signup">Signup</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Banner */}
            <div className="banner">
                <Link to="/">
                    Guardians of Pets
                    <img src={Logo} width="80" height="80" alt="logo" />
                </Link>
            </div>
            <hr />
        </div>
    );
};

export default Header;
