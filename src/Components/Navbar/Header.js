import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo.png';
import dbAxios from "../../api/axios";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dbAxios.get('/check-session', { withCredentials: true })
            .then(response => {
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.error("로그인 상태 확인 오류:", error);
                setIsLoggedIn(false);
            });
    }, []);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            dbAxios.post('/logout', {}, { withCredentials: true })
                .then(response => {
                    setIsLoggedIn(false);
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
