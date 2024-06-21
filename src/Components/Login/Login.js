import React, { useState } from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        // 로그인 처리 로직. 서버에 로그인 요청 보내기
        console.log(`Username: ${username}, PW: ${password}`);
    };

    return(
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Name:</label>
                    <input 
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">PW:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;