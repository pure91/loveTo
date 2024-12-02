import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import '../../assets/styles/join/JoinProfile.css'

const JoinProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state; // 이전 페이지에서 전달된 formData

    // 프로필 값
    const [profileData, setProfileData] = useState({
        id: '',
        name: '',
        profilePicture: null,
    })

    // 프로필 사진 미리보기 URL
    const [previewUrl, setPreviewUrl] = useState(null);

    // 파일 인풋 값
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileData({ ...profileData, profilePicture: file });

        // 파일이 선택되었을 때 미리보기 url 생성
        const fileReader = new FileReader();
        fileReader.onloadend = () => { // 파일 다 읽으면
            setPreviewUrl(fileReader.result); // 파일 내용 반환
        };

        // 파일이 있으면 읽어서 URL 생성
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }

    // 아이디, 이름 인풋 값
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    }

    // 최종 가입
    const handleSubmit = () => {
        console.log(`최종 회원가입 데이터:`, { ...formData, ...profileData });
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

                    {/* 프로필 */}
                    <div className="container">
                        <label htmlFor="profilePicture" className="label">프로필 사진</label>
                        {/* 프로필 업로드 시 미리 보기 */}
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
                        <input
                            id="profilePicture"
                            name="profilePicture"
                            type="file"
                            className="style-input"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/*아이디*/}
                    <div className="container">
                        <label htmlFor="id" className="label">아이디</label>
                        <input
                            id="id"
                            name="id"
                            type="text"
                            className="style-input"
                            placeholder="아이디를 설정해 주세요."
                            value={profileData.id}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* 이름 */}
                    <div className="container">
                        <label htmlFor="name" className="label">이름</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="style-input"
                            placeholder="이름을 설정해 주세요."
                            value={profileData.name}
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