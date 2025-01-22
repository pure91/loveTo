import React, {useEffect, useState} from 'react';
import '../../assets/styles/join/LoginAndJoin.css';
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import axios from "axios";
import InputValid from "./InputValid";

const Login = ({ setIsAuthenticated, setUserInfo }) => {
    const [formData, setFormData] = useState({id: '', password: ''});
    const [error, setError] = useState({id: '', password: ''});
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // 저장된 아이디 불러오기
    useEffect(() => {
        const savedId = localStorage.getItem('savedId');
        if (savedId) {
            setFormData((prevData) => ({...prevData, id: savedId}));
            setRememberMe(true);
        }
    }, []);

    // 아이디 저장
    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);

        if (!rememberMe) {
            localStorage.setItem('savedId', formData.id);
        } else {
            localStorage.removeItem('savedId');
        }
    };

    // 엔터키 활성화
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    }

    // 로그인 시도
    const handleLogin = async () => {
        if (formData.id === '' || formData.id === null) {
            alert("아이디를 입력해 주세요.");
            return;
        }

        if (formData.password === '' || formData.password === null) {
            alert("비밀번호를 입력해 주세요.")
            return;
        }

        const loginData = {id: formData.id, password: formData.password};
        console.log("front단 loginData:", loginData);

        try {
            const response = await axios.post('/api/login', loginData, {withCredentials: true}); // 다른 도메인에 요청 보낼때 쿠키와 인증 정보를 함께 전송
            console.log("로그인 성공:", response.data);

            // 로그인 성공 시 JWT 토큰을 Localstorage에 저장
            localStorage.setItem('token', response.data.token);
            console.log("reponse.data.token:", response.data.token);

            setIsAuthenticated(true);
            setUserInfo(response.data.user);
            navigate('/');
        } catch (error) {
            console.error('로그인 실패:', error);

            // 401 에러 처리
            if (error.response && error.response.status === 401) {
                alert(error.response.data.message);
            }

            setError((prevError) => ({
                ...prevError,
                id: '로그인에 실패했습니다.',
                password: '로그인에 실패했습니다.'
            }));
        }
    };

    // 회원가입
    const handleSignUp = () => {
        navigate('/join/email');
    };

    return (
        <main className="main">
            <Helmet>
                <title>로그인</title>
            </Helmet>
            <div className="layout-wrapper">
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <h1 className="title">Welcome!</h1>
                    <InputValid
                        id='id'
                        label="아이디"
                        formData={formData}
                        setFormData={setFormData}
                        error={error}
                        setError={setError}
                        inputProps={{
                            type: 'text',
                            placeholder: '아이디를 입력하세요',
                            autoComplete: 'off',
                            onKeyDown: (e) => activeEnter(e),
                        }}
                    />
                    <InputValid
                        id='password'
                        label='비밀번호'
                        formData={formData}
                        setFormData={setFormData}
                        error={error}
                        setError={setError}
                        inputProps={{
                            type: 'password',
                            placeholder: '비밀번호를 입력하세요',
                            autoComplete: 'off',
                            onKeyDown: (e) => activeEnter(e),
                        }}
                    />
                    <div className="div-save-id">
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
        </main>
    );
};

export default Login;
