import React, {useState} from "react";
import "../../assets/styles/photo_album/PhotoAlbum.css";
import {useNavigate} from "react-router-dom";

const PhotoAlbum = ({isAuthenticated, userInfo}) => {
    // 사진 목록 상태
    const [postList, setPostList] = useState([]);
    // 새 사진 상태
    const [newPost, setNewPost] = useState({image: "", caption: ""});
    // 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 선택된 빈 사진 박스 인덱스
    const [selectedIndex, setSelectedIndex] = useState(null);

    const navigate = useNavigate();

    // 입력값
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewPost({...newPost, [name]: value});
    };

    // 사진 제출
    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (newPost.image && newPost.caption) {
            const updatedPostList = [...postList];

            if (selectedIndex !== null) {
                updatedPostList[selectedIndex] = newPost; // 선택된 빈 박스에 사진 추가
            } else {
                updatedPostList.push(newPost); // 새로운 게시물 추가
            }
            setPostList(updatedPostList);
            setNewPost({image: "", caption: ""});
            setIsModalOpen(false);
            setSelectedIndex(null);
        }
    };

    // 모달 열기
    const openModal = (index) => {
        setSelectedIndex(index); // 선택된 박스 인덱스 저장
        setIsModalOpen(true); // 모달 열기
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedIndex(null); // 선택 초기화
    };

    // 미 접속 시
    if (!isAuthenticated || !userInfo) {
        navigate('/');
        alert("로그인 후 사용 가능합니다.");
        return;
    }

    // 사진 빈 공간 한줄에 4개
    const renderPostItemList = () => {
        const totalImages = postList.length < 4 ? 4 : postList.length;
        let newPostList = [...postList];

        // 사진 개수가 부족하면 빈 박스를 추가하여 4개의 공간으로 맞춤
        while (newPostList.length < 4) {
            newPostList.push({image: "", caption: ""});
        }

        return newPostList.map((post, index) => (
            <div
                key={index}
                className={`post-item ${post.image ? "" : "empty"}`}
                onClick={() => post.image === "" && openModal(index)} // 빈 사진 박스를 클릭하면 모달 열기
            >
                {post.image ? (
                    <>
                        <img src={post.image} alt={`Post ${index}`}/>
                        <p>{post.caption}</p>
                        <div className="post-actions">
                            <button>❤️ 좋아요</button>
                            <button>💬 댓글</button>
                        </div>
                    </>
                ) : (
                    <span>사진을 추가하세요</span> // 빈 박스에 텍스트 표시
                )}
            </div>
        ));
    };

    return (
        <div className="photo-album-container">
            <h1>📷</h1>

            {/* 사진 목록 그리드 */}
            <div className="post-grid">{renderPostItemList()}</div>

            {/* 사진 추가 모달 */}
            {isModalOpen && (
                <div className="photo-modal-overlay">
                    <div className="photo-modal-content">
                        <h2>사진 추가</h2>
                        <form onSubmit={handlePostSubmit}>
                            <input
                                type="file"
                                name="image"
                                value={newPost.image}
                                onChange={handleInputChange}
                                required
                            />
                            <textarea
                                name="caption"
                                placeholder="사진 설명을 입력하세요"
                                value={newPost.caption}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit">저장</button>
                            <button type="button" onClick={closeModal}>
                                취소
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoAlbum;