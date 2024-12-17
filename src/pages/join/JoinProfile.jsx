import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import '../../assets/styles/join/JoinProfile.css'
import axios from "axios";

const JoinProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const forwardFormData = location.state; // 이전 페이지에서 전달된 formData

    console.log("넘어온 데이터 확인 formData:",forwardFormData);

    // 프로필 Data
    const [profileData, setProfileData] = useState({
        id: '',
        nickname: '',
        profilePicturePath: null,
        profilePictureName: "",
    })

    // 프로필 사진 미리보기 URL
    const [previewUrl, setPreviewUrl] = useState(null);

    // 드래그 앤 드롭 상태
    const [dragActive, setDragActive] = useState(false);

    // 파일 처리 공통 함수
    const handleFile = (file) => {
        console.log("파일업데이트 : ", file);
        setProfileData({
            ...profileData,
            profilePicturePath: file,
            profilePictureName: file.name
        });

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
    // const handleFileCancel = () => {
    //     setProfileData({...profileData, profilePicturePath: null, profilePictureName: ""});
    //     setPreviewUrl(null);
    //     document.getElementById('profilePicturePath').value = ""; // 파일 인풋 초기화
    // }

    // 아이디, 닉네임 인풋 값
    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setProfileData({...profileData, [id]: value });
        console.log("Updated profileData:", profileData);  // 상태 업데이트 후 로그
    }

    // 회원가입 최종 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('email', forwardFormData.email || '');
        formDataToSubmit.append('password', forwardFormData.password || '');
        formDataToSubmit.append('id', profileData.id || '');
        formDataToSubmit.append('nickname', profileData.nickname || '');

        if (profileData.profilePicturePath) {
            formDataToSubmit.append('profilePicturePath', profileData.profilePicturePath || '');
            formDataToSubmit.append('filename', profileData.profilePictureName || '');
        } else {
            console.warn('No profile picture selected');
        }
        console.log('FormData 확인:', formDataToSubmit);

        try {
            const response = await axios.post('/api/join', formDataToSubmit);
            if (response.status === 200) {
                console.log("회원가입 성공:", response.data);
                navigate('/');
            }
        } catch (error) {
            console.log("회원가입 실패:", error);
        } finally {

        }
    };

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
                            <>
                                <img
                                    src={previewUrl}
                                    alt="Profile Preview"
                                    className="profile-picture"
                                />
                                {/*/!* X 버튼 *!/*/}
                                {/*<button*/}
                                {/*    type="button"*/}
                                {/*    className="reset-btn"*/}
                                {/*    onClick={handleFileCancel}*/}
                                {/*>*/}
                                {/*    X*/}
                                {/*</button>*/}
                            </>
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
                        <div className="file-placeholder">
                            드래그 앤 드롭 또는 <label htmlFor="profilePicturePath" className="file-select-label">파일 선택</label>
                        </div>

                        <input
                            id="profilePicturePath"
                            name="profilePicturePath"
                            type="file"
                            className="file-input"
                            onChange={handleFileChange}
                            style={{display: 'none'}} // 기본 file 선택 숨김
                        />
                    </div>

                    {/* 아이디 */}
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

                    {/* 닉네임 */}
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