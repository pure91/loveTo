import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import '../../assets/styles/join/JoinProfile.css'

const JoinProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state; // 이전 페이지에서 전달된 formData

    // 프로필 Data
    const [profileData, setProfileData] = useState({
        id: '',
        nickname: '',
        profilePicture: null,
        profilePictureName: "",  // 파일 이름을 따로 저장
    })

    // 프로필 사진 미리보기 URL
    const [previewUrl, setPreviewUrl] = useState(null);

    // 드래그 앤 드롭 상태
    const [dragActive, setDragActive] = useState(false);

    // 파일 처리 공통 함수
    const handleFile = (file) => {
        setProfileData({...profileData, profilePicture: file, profilePictureName: file.name});

        // 파일 선택 시 미리보기 url 생성
        const fileReader = new FileReader();
        fileReader.onloadend = () => {  // 파일 다 읽으면
            setPreviewUrl(fileReader.result); // 파일 내용 반환
        };

        // 파일이 있으면 읽어서 URL 생성
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    }

    // 드래그
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragover") {
            setDragActive(true);
        } else {
            setDragActive(false);
        }
    }

    // 드롭
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }

    // 파일 선택 취소
    const handleFileCancel = () => {
        setProfileData({...profileData, profilePicture: null, profilePictureName: ""});
        setPreviewUrl(null);
        document.getElementById('profilePicture').value = ""; // 파일 인풋 초기화
    }

    // 아이디, 닉네임 인풋 값
    const handleInputChange = (e) => {
        const {nickname, value} = e.target;
        setProfileData({...profileData, [nickname]: value});
    }

    // 최종 가입
    const handleSubmit = () => {
        console.log(`최종 회원가입 데이터:`, {...formData, ...profileData});
        navigate('/'); // home
    }

    return (
        <main className="main">
            <Helmet>
                <title>프로필 설정</title>
            </Helmet>
            <div className="layout-wrapper">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="title">회원가입 - 프로필 설정</h1>

                    {/* 프로필 사진 미리보기 */}
                    <div className="profile-picture-container">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Profile Preview"
                                className="profile-picture"
                            />
                        ) : (
                            <div className="profile-picture-placeholder">사진 미리보기</div>
                        )}
                    </div>

                    {/* 드래그 앤 드롭 */}
                    <div
                        className={`file-input-wrapper ${dragActive ? "drag-active" : ""}`}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                    >
                        {/* 파일 선택 후 기본 input[type="file"] 숨김 */}
                        {profileData.profilePicture ? (
                            <div className="file-name-display">{profileData.profilePictureName}</div>
                        ) : (
                            <div className="file-placeholder">
                                드래그 앤 드롭 또는 <label htmlFor="profilePicture" className="file-select-label">파일 선택</label>
                            </div>
                        )}

                        <input
                            id="profilePicture"
                            name="profilePicture"
                            type="file"
                            className="file-input"
                            onChange={handleFileChange}
                            style={{display: 'none'}}
                        />
                        {/* X 버튼 */}
                        {profileData.profilePicture && (
                            <button
                                type="button"
                                className="reset-btn"
                                onClick={handleFileCancel}
                            >
                                X
                            </button>
                        )}
                    </div>



                    {/*아이디*/}
                    <div className="container">
                        <label htmlFor="id" className="label">아이디</label>
                        <input
                            className="style-input"
                            id="id"
                            name="id"
                            type="text"
                            placeholder="아이디를 설정해 주세요."
                            value={profileData.id}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* 이름 */}
                    <div className="container">
                        <label htmlFor="nickname" className="label">닉네임</label>
                        <input
                            className="style-input"
                            id="nickname"
                            name="nickname"
                            type="text"
                            placeholder="닉네임을 설정해 주세요."
                            value={profileData.nickname}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* 제출 */}
                    <button
                        type="submit"
                        className="next-btn default"
                    >
                        회원가입 완료
                    </button>
                </form>
            </div>
        </main>
    );
}

export default JoinProfile;