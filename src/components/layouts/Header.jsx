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
            if (!e.target.closest('.modal-content') && !e.target.closest('.user-profile')) {
                setOutsideClick(true);
            }
        };

        // 마우스 이벤트 (데스크탑)
        document.addEventListener('mousedown', outSideClick);  // 눌렀을 때 발생
        document.addEventListener('mouseup', outSideClick);    // 떼었을 때 발생

        // 터치 이벤트 (모바일)
        document.addEventListener('touchstart', outSideClick); // 터치스크린에서 손가락을 화면에 대면 발생
        document.addEventListener('touchend', outSideClick);

        // 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener('mousedown', outSideClick);
            document.removeEventListener('mouseup', outSideClick);
            document.removeEventListener('touchstart', outSideClick);
            document.removeEventListener('touchend', outSideClick);
        };
    }, []);

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
