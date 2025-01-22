/** 백엔드 서버 설정 및 라우팅 */

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const path = require('path');

const cors = require("../middlewares/cors");
const routes = require('../routes/apiRoute');

// Middleware 구성
app.use(cors);
app.use(express.json()); // JSON 요청 본문(body) 처리
app.use(express.urlencoded({ extended: true }));

// 업로드 경로
const uploadsPath = path.join(__dirname, '..', 'routes', 'uploads');
app.use('/uploads', express.static(uploadsPath));
console.log('Uploads 경로:', uploadsPath);

// 모든 라우팅 경로를 /api로 설정
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Server Start
app.listen(PORT, () => {
    console.log(`백엔드 서버 포트 http://localhost:${PORT}`);
})



