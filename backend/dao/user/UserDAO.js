const pool = require('../../db/connection');

/** 사용자 DAO */
const UserDAO = {
    // 사용자 추가
    async insertUser(userData) {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query(
                'INSERT INTO user_tb (email, password, id, nickname, profile_picture_path, profile_picture_name) VALUES (?, ?, ?, ?, ?, ?)',
                [userData.email, userData.password, userData.id, userData.nickname, userData.profilePicturePath, userData.profilePictureName]
            );
            console.log('회원가입 insert Result:', result);
            return result;
        } catch (error) {
            console.log(error);
        } finally {
            conn.release();
        }
    },

    // 사용자 id 조회
    async getUserById(id) {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query("SELECT id, password, delete_yn FROM user_tb WHERE id = ? AND delete_yn = 'N'", [id]);
            console.log("DB id조회:", result);
            return result[0];
        } catch (error) {
            console.error("DB 조회 오류:", error);
            throw error;
        } finally {
            conn.release();
        }
    },

    // 사용자 조회
    async getAllUsers(decodeId) {
        const conn = await pool.getConnection();
        try {
            // 사용자 조회
            const result = await conn.query("SELECT id, nickname, email, profile_picture_path FROM user_tb WHERE id = ? AND delete_yn = 'N'", [decodeId]);

            // 만약 사용자 정보가 있으면(로그인 완료라면 마지막 로그인일자 기록)
            if (result[0]) {
                await conn.query('UPDATE user_tb SET last_login_date = CURRENT_TIMESTAMP WHERE id = ?', [decodeId]);
            }

            return result[0];
        } catch (error) {
            console.log(error);
        } finally {
            conn.release();
        }
    },


}

module.exports = UserDAO;