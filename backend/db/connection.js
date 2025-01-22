/** MariaDB 연결 풀 생성&설정 */

require('dotenv').config(); // .env 파일에서 환경 변수 로드

const mariadb = require('mariadb');

// MariaDB 연결 풀 생성
const pool = mariadb.createPool({ // 여러 클라이언트가 동시에 db에 접근할때 효율적인 연결을 관리하는 createPoll
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5 // 연결 풀 크기 설정
});

module.exports = pool;