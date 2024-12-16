import React from 'react';
import '../assets/styles/Home.css';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import IconPhoto from '../assets/images/icon-photo.png';
import IconCouple from '../assets/images/icon-couple.png';

const Home = () => {
    return (
        <div className="home-container">
            <Helmet>
                <title>LoveTo</title>
            </Helmet>
            <div className="home-banner">
                <h1>해피 럽투!🍀</h1>
                <p>럽투와 함께 행복한 추억을 쌓아보세요☺️</p>
                <Link to="/login">
                    <button className="cta-button" aria-label="로그인 페이지로 이동">
                        시작하기
                    </button>
                </Link>
            </div>
            <div className="home-services">
                <div className="service-box">
                    <img src={IconPhoto} alt="사진첩 아이콘" />
                    <h3>사진첩</h3>
                    <p>소중한 추억을 기록하세요.</p>
                </div>
                <div className="service-box">
                    <img src={IconCouple} alt="애정도 아이콘" />
                    <h3>애정도</h3>
                    <p>애정도를 확인해보세요.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
