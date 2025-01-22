import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import Login from './pages/join/Login';
import JoinEmail from "./pages/join/JoinEmail";
import JoinProfile from "./pages/join/JoinProfile";
import axios from "axios";
import PhotoAlbum from "./pages/photo_album/PhotoAlbum";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    // 로그인 상태 확인 (앱 시작 시 한 번만 확인)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get('/api/profile', {
                        headers: {Authorization: `Bearer ${token}`},
                    });
                    setIsAuthenticated(true);
                    setUserInfo(response.data); // 사용자 정보 저장
                    console.log("response@@@@@@@@@@@@@@@@;", response.data);
                } catch (error) {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                }
            };
            fetchUserProfile();
        } else {
            setIsAuthenticated(false); // 로그인 상태가 아니면
        }
    }, [isAuthenticated]);

    // 로그아웃 처리
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);   // 로그아웃 시 상태 변경
        setUserInfo(null);           // 사용자 정보 초기화
        navigate('/');
    };

    return (
        <Routes>
            <Route path="/join/email" element={<Layout><JoinEmail/></Layout>}/>
            <Route path="/join/profile" element={<Layout><JoinProfile/></Layout>}/>
            <Route path="/"
                   element={
                       <Layout isAuthenticated={isAuthenticated} userInfo={userInfo} handleLogout={handleLogout}>
                           <Home/>
                       </Layout>}
            />
            <Route path="/login"
                   element={
                       <Layout isAuthenticated={isAuthenticated} userInfo={userInfo}>
                           <Login setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo}/>
                       </Layout>}
            />
            <Route path="/photo/album"
                   element={<Layout isAuthenticated={isAuthenticated} userInfo={userInfo} handleLogout={handleLogout}>
                       <PhotoAlbum/>
                   </Layout>}
            />
        </Routes>
    );
};

export default App;
