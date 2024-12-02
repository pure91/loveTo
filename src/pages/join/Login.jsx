import React, { useState } from 'react';
import '../../assets/styles/join/Join.css'; // CSS 경로 확인
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // 아이디 저장
    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    // 로그인 시도
    const handleLogin = () => {
        console.log("로그인 시도");
        const loginData = { username, password, rememberMe };

        // express app.js 서버로 요청
        fetch('http://localhost:3002/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then(response => response.json())
            .then(data => {
                console.log("로그인 성공:", data);
            })
            .catch(error => {
                console.error('로그인 실패:', error);
            });
    };

    // 회원가입
    const handleSignUp = () => {
        console.log("회원가입 페이지로 이동");
        navigate('/join');
    };

    return (
        <div className="auth-container">
            <Helmet>
                <title>로그인</title>
            </Helmet>
            <div className="login-box">
                <h1 className="title">🎎</h1>
                <form>
                    <div className="input-group">
                        <label htmlFor="username">아이디</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="아이디를 입력하세요"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="options">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                            아이디 저장
                        </label>
                    </div>
                    <div className="button-group">
                        <button type="button" className="login-btn" onClick={handleLogin}>로그인</button>
                        <button type="button" className="signup-btn" onClick={handleSignUp}>회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
