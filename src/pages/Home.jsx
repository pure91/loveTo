import React from 'react';
import '../assets/styles/Home.css';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

const Home = () => {
    return (
        <div className="home-container">
            <Helmet>
                <title>LoveTo</title>
            </Helmet>
            <div className="home-banner">
                <h1>해피 럽투!🍀</h1>
                <p>럽투와 함께 행복한 추억을 쌓아보세요☺️</p>
                <Link to="/login"><button className="cta-button">시작하기</button></Link>
            </div>
            <div className="home-services">
                <div className="service-box">서비스1</div>
                <div className="service-box">서비스2</div>
                <div className="service-box">서비스3</div>
                <div className="service-box">서비스4</div>
            </div>
        </div>
    );
};

export default Home;
