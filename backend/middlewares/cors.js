/** CORS 설정 */

// 서버가 cors를 지원하도록 설정함
// Cross-Origin Resource Sharing = 교차 출처 리소스 공유, 다른 출처의 자원을 주고 받을때 이 자원을 공유함

const cors = require("cors");

// 허용할 옵션들
const corsOptions = {
    origin: 'http://localhost:3001',                    // React 클라이언트(프론트)에서 오는 요청을 허용하겠다. => react앱 3001에서 백엔드 api 3002로 요청이 발생할때 cors허용이 필요한것
    methods: ['GET', 'POST', 'PUT', 'DELETE'],          // 해당 HTTP 메서드만 허용하겠다.
    allowedHeaders: ['Content-Type', 'Authorization'],  // 해당 헤더만 허용 하겠다.
};

module.exports = cors(corsOptions);