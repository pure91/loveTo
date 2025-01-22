const express = require('express');
const router = express.Router();
const UserDAO = require('../../dao/user/UserDAO');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/** 로그인, 회원가입 컨트롤러 */
const UserController = {

    // 회원 가입
    async registerUser(req, res) {
        try {
            const {id, password, nickname, email} = req.body;

            if (!id || !password || !nickname || !email) {
                return res.status(400).json({
                    success: false,
                    message: "필수 입력 값이 누락되었습니다.",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10); // bcrypt는 평문을 암호화해줌, hash로 입력값을 해싱함(고정된 크기의 암호화된 문자열로 변환), 10은 saltRounds 값(매번 다른 해시값을 생성하는 임의의 횟수, 10보다 커지면 보안은 강화되도 서버 성능에 영향이 갈 수 있음)

            const userData = {
                id,
                password: hashedPassword,
                email,
                nickname,
                profilePicturePath: req.file ? req.file.path : '',
                profilePictureName: req.file ? req.file.originalname : '',
            };

            // DB 요청
            await UserDAO.insertUser(userData);

            res.status(200).json({
                success: true,
                message: "회원가입 성공!",
                data: userData
            });
        } catch (error) {
            console.error("회원 가입 오류 발생:", error);
            res.status(500).json({
                success: false,
                message: "회원가입 중 오류가 발생했습니다."
            });
        }
    },

    // 로그인
    async login(req, res) {
        const {id, password} = req.body;

        if (!id || !password) {
            return res.status(400).json({message: '아이디와 비밀번호를 입력하세요.'});
        }

        try {
            // DB에서 사용자 id 조회
            const user = await UserDAO.getUserById(id);

            if (!user) {
                console.warn(`[로그인 실패] 존재하지 않는 아이디: ${id}`);
                return res.status(401).json({ message: '아이디가 올바르지 않습니다.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.warn(`[로그인 실패] 잘못된 비밀번호 => 아이디: ${id}`)
                return res.status(401).json({ message: '비밀번호가 올바르지 않습니다.'});
            }

            // 유효성검사 통과 시 JWT 토큰 발급
            const token = jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            console.log("컨트롤러 로그인쪽:", token);

            // JWT를 HttpOnly 쿠키에 저장
            res.cookie('token', token, {
                httpOnly: true,     // JavaScript에서 접근 불가
                secure: true,       // HTTPS에서만 작동
                maxAge: 3600000,    // 1시간 동안 유효
                sameSite: 'Strict'  // CSRF 방지
            });

            return res.json({ token: token, message: '로그인 성공' });
        } catch (error) {
            console.error('로그인 오류:', error);
            return res.status(500).json({ message: '로그인 중 오류가 발생했습니다.' });
        }
    },

    // 사용자 조회
    async userProfile(req, res) {
        const token = req.headers['authorization']?.split(' ')[1];
        console.log("UserController => token:", token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT 검증
            console.log("UserController => decoded:", decoded);

            const user = await UserDAO.getAllUsers(decoded.id);
            console.log("UserController => user:", user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({
                id : user.id || '',
                nickname: user.nickname || '',
                email : user.email || '',
                profilePicturePath: `${process.env.SERVER_URL}${process.env.UPLOADS_PATH}${user.profile_picture_path.replace('C:\\Users\\NC413\\Desktop\\loveTo\\backend\\routes\\uploads', '').replace(/\\/g, '/')}` || '',
            });
        } catch (error) {
            console.error('error fetching user list:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    },

};

module.exports = UserController;