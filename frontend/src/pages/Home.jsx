import React from 'react';
import '../assets/styles/Home.css';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import IconPhoto from '../assets/images/icon_photo.png';
import IconCouple from '../assets/images/icon_couple.png';
import CouplePhoto1 from '../assets/images/couple_photo_1.jpg';
import CouplePhoto2 from '../assets/images/couple_photo_2.jpg';

const Home = ({ isAuthenticated, userInfo }) => {

    return (
        <div className="home-container">
            <Helmet>
                <title>LoveTo</title>
            </Helmet>
            <div>
                {isAuthenticated && userInfo ? (
                    <div className="home-banner">
                        <h1>❣️Happy Love✌️</h1>
                        <p>럽투와 함께 행복한 추억을 쌓아보세요☺</p>
                        <div className="home-services">
                            <Link to="/photo/album">
                                <div className="service-box">
                                    <img src={IconPhoto} alt="사진첩 아이콘"/>
                                    <h3>사진첩</h3>
                                    <p>소중한 추억을 기록하세요.</p>
                                </div>
                            </Link>
                            <div className="service-box">
                                <img src={IconCouple} alt="애정도 아이콘"/>
                                <h3>애정도</h3>
                                <p>애정도를 확인해보세요.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="home-banner">
                        <h1>❣️Happy Love✌️</h1>
                        <p>럽투와 함께 행복한 추억을 쌓아보세요</p>
                        <Link to='/login'>
                            <button className="cta-button" aria-label="로그인 페이지로 이동">
                                시작하기
                            </button>
                        </Link>
                        <div className="photo-container">
                            <div className="photo-item">
                                <img src={CouplePhoto1} alt="Couple_photo"/>
                                <img src={CouplePhoto2} alt="Couple_photo"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
