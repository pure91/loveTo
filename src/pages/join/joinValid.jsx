/** 반복 api 요청 파일 기능별 분리 */

const BASE_URL = 'http://localhost:3002/api'; // 서버 기본 주소

// 공통 API 요청 함수
export const request = async (url, options) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log('API 요청 에러:', err);
  }
};

// 회원가입 API 요청
export const join = async (formData) => {
    return await request('user', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
};

// 중복 검사 API 요청
export const validateForm = async (id, formData) => {
    return await request(`user/${id}valid`, {
        method: 'POST',
        body: JSON.stringify({user: {[id]: formData[id]}}),
    });
};