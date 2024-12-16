import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // 환경변수에 설정된 URL 사용
});

export default api;