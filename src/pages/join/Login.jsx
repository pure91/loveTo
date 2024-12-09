import React, {useEffect, useState} from 'react';
import '../../assets/styles/join/LoginAndJoin.css'; // CSS 경로 확인
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // 저장된 아이디 불러오기
    useEffect(() => {
        const savedId = localStorage.getItem('savedId');
        if (savedId) {
            setId(savedId);
            setRememberMe(true);
        }
    }, []);

    // 아이디 저장
    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);

        if (!rememberMe) {
            localStorage.setItem('savedId', id);
            console.log("로컬에 아이디저장", rememberMe, id);
        } else {
            localStorage.removeItem('savedId');
            console.log("아이디제거", rememberMe, id);
        }
    };

    // 로그인 시도
    const handleLogin = () => {
        console.log("로그인 시도");
        const loginData = {id, password, rememberMe};

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
                <h1 className="title">Welcome!</h1>
                <form>
                    <div className="input-group">
                        <div className="container">
                            <label htmlFor="id" className="label">아이디</label>
                            <input
                                type="text"
                                id="id"
                                placeholder="아이디를 입력하세요"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="style-input"
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="container">
                            <label htmlFor="password" className="label">비밀번호</label> <input
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="style-input"
                        />
                        </div>
                    </div>
                    <div className="input-group2">
                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                id="save-id"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                            <span className="checkbox-circle"></span>
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
