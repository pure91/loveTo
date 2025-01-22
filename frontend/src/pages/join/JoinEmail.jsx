import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import '../../assets/styles/join/LoginAndJoin.css';
import InputValid from "./InputValid";

/** 회원가입 페이지 */
const JoinEmail = () => {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [error, setError] = useState({email: '', password: ''});
    const [isActivated, setIsActivated] = useState(false);
    const navigate = useNavigate();

    // 정상 입력 시 다음 버튼 생성
    useEffect(() => {
        if (error.email ==='noError' && error.password === 'noError') {
            setIsActivated(true);
        } else {
            setIsActivated(false);
        }
    }, [error.email, error.password]);


    // 엔터키 활성화
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            handleNextClick();
        }
    }

    // 다음 버튼 클릭
    const handleNextClick = () => {

        if (formData.email === '' || formData.email === null) {
            alert("이메일을 입력해 주세요.");
            return;
        }

        if (formData.password === '' || formData.password === null) {
            alert("비밀번호를 입력해 주세요.")
            return;
        }

        navigate('/join/profile', { state: formData });
    }

    return (
        <main className="main">
            <Helmet>
                <title>회원가입</title>
            </Helmet>
            <div className="layout-wrapper">
                <form className="form">
                    <h1 className="title">이메일로 회원가입</h1>
                    <InputValid
                        id='email'
                        label='이메일'
                        formData={formData}
                        setFormData={setFormData}
                        error={error}
                        setError={setError}
                        inputProps={{
                            type: 'email',
                            placeholder: '이메일 주소를 입력해 주세요.',
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
                          placeholder: '비밀번호를 입력해 주세요. (6자 이상)',
                          autoComplete: 'off',
                          onKeyDown: (e) => activeEnter(e),
                        }}
                      />
                    <button
                        onClick={handleNextClick}
                        className={`next-btn ${isActivated ? 'default' : 'disabled'}`}
                        disabled={!isActivated}
                        type="button"
                    >
                        다음
                    </button>
                </form>
            </div>
        </main>
    );
};

export default JoinEmail;
