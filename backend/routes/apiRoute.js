/** 공통 API 라우트 계층 설정 */
const express = require('express');
const multer = require("multer");
const fs = require("fs"); // fs는 File System module
const path = require("path");
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserController = require('../controller/user/UserController');

/** JWT 인증 미들웨어 설정 */
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // 쿠키에서 JWT 토큰을 가져옴

    if (!token) {
        return res.status(401).json({message: '로그인이 필요합니다.'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({message: '유효하지 않은 토큰입니다.'});
        }
        req.user = user; // 인증된 사용자 정보 저장
        next(); // 다음 요청 진행
    });
};

/** 파일이 저장될 폴더 및 파일 이름 설정 */
// 날짜 기반 폴더 생성 함수
function getUploadPath() {
    const now = new Date();
    // join함수는 문자열을 기대하기에 숫자를 넘기면안되서 String으로 변환해야함
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 0부터 시작하여 +1, 두 자릿수 처리
    const day = String(now.getDate()).padStart(2, '0');
    return path.join(__dirname, 'uploads', year, month, day); // 파일 및 폴더 경로를 시스템에 맞게 join으로 결합하여 / / / 경로 생성, dirname은 현재 실행중인 파일의 디렉토리 경로(uploads)
}

// 업로드 경로 생성 및 폴더 존재 확인
function ensureUploadPath() {
    const uploadPath = getUploadPath();
    // 서버 시작 시 uploads 폴더 확인 및 생성
    if (!fs.existsSync(uploadPath)) { // 경로에 파일이 존재하는지 확인 true, false 반환
        fs.mkdirSync(uploadPath, { recursive : true }); // 지정 경로에 폴더를 동기적으로 생성(path, options) => recursive는 중첩된 경로 생성(ex: uploads/2024/12/16)
    }
    return uploadPath;
}

// multer 설정
const storage = multer.diskStorage({ // storage는 디스크, 메모리를 저장할 정보 => diskStorage는 하드 디스크에 업로드 파일을 저장한다는 뜻
    destination: (req, file, cb) => { // destination은 저장할 경로
        const uploadPath = ensureUploadPath(); // 폴더 생성
        cb(null, uploadPath); // 파일 저장할 경로(cb는 콜백의 약어)
    },
    filename: (req, file, cb) => { // 저장할 파일명
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // 동일한 이름의 파일 업로드 방지를 위한 난수 사용
        cb(null, uniqueSuffix + path.extname(file.originalname)); // extname은 파일 확장자
    },
})

// 파일 크기 제한 5MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

/** 보호된 사용자 api 라우트 (인증 필요) */
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: '인증된 사용자만 접근할 수 있는 데이터 '});
})
router.get('/profile', UserController.userProfile);      // 목록 조회

/** 사용자 관련 API */
router.post('/join', upload.single('profilePicturePath'), UserController.registerUser); // 회원가입, 1개만 업로드할 거라 single 사용(저 name은 html FormData의 name 속성, fieldname임 => 입력정보를 컨트롤러로)
router.post('/login', UserController.login);        // 로그인

/** 나중에 다른 API ㄱㄱ */

module.exports = router;