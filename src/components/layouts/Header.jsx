import React, {useEffect, useState} from 'react';
import '../../assets/styles/layouts/Header.css';
import DefaultProfile from '../../assets/images/icon_default_profile.png';
import LogoutIcon from '../../assets/images/icon_logout.png';
import {Link} from "react-router-dom";


const Header = ({isAuthenticated, userInfo, handleLogout}) => {
    // 프로필 사진 URL
    const profileUrl = userInfo?.profilePicturePath ? userInfo.profilePicturePath : DefaultProfile;

    // 모달 여닫기
    const [isModalOpen, setModalOpen] = useState(false);
    // 모달 열고 닫기
    const toggleModal = () => {
        setModalOpen(prev => !prev);
    };
    // 외부 클릭 시 모달 닫기
    const [isOutsideClick, setOutsideClick] = useState(false);

    useEffect(() => {
        const outSideClick = (e) => {
            if (
                isModalOpen && // 모달이 열려 있을때만
                !e.target.closest('.modal-content') && // 모달 내부 클릭이 아님
                !e.target.closest('.user-profile') // 프로필 이미지를 클릭한것이 아님
            ) {
                setOutsideClick(true);
            }
        };

        // 마우스 이벤트 (데스크탑)
        document.addEventListener('mousedown', outSideClick);  // 눌렀을 때 발생

        // 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener('mousedown', outSideClick);
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (isOutsideClick) {
            setModalOpen(false); // 외부 클릭 시 모달 닫기
            setOutsideClick(false); // 외부 클릭 상태 초기화
        }
    }, [isOutsideClick]);

    return (
        <header className="header-container">
            <div className="header-content">
                <Link to="/" className="nav-link"><h1 className="logo">Couple Diary</h1></Link>
                <nav>
                    {isAuthenticated && userInfo ? (
                        <div className="user-profile">
                            <img
                                src={profileUrl}
                                alt="profile"
                                className="profile-picture"
                                onClick={toggleModal}
                            />
                        </div>
                    ) : (
                        <div>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/join/email" className="nav-link">Join</Link>
                        </div>
                    )}
                </nav>
            </div>

            {/* 프로필 모달 */}
            {isModalOpen && isAuthenticated && userInfo && (
                <div className="modal-content">
                    <div className="modal-inner">
                        <img
                            src={profileUrl}
                            alt="Profile"
                            className="modal-profile-picture"
                        />
                        <div className="modal-user-info">
                            <h2>반가워요, {userInfo.nickname || ''} 님🙌️</h2>
                            <p>{userInfo.email || ''}</p>
                        </div>
                        <button onClick={handleLogout} className="close-modal-button">
                            <img src={LogoutIcon} alt="Logout" className="logout-icon"/>로그아웃
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
