import React, {useEffect} from 'react';

// 유효성 검사 실패 시 노출되는 메시지
const ERROR_MSG = {
    required: '필수 입력사항을 입력해주세요.',
    emailPattern: '이메일 형식을 확인해주세요.',
    pwPattern: '비밀번호는 대/소문자, 숫자 6자 이상만 허용합니다.',
    idPattern: '2~16자 이내의 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.',
    nicknamePattern: '2~16자의 한글, 영문, 숫자만 입력 가능합니다.',
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
const PASSWORD_REGEX = /^[A-Za-z0-9]{6,}$/;
const ID_REGEX = /^[a-z0-9A-Z_.]{2,16}$/;
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9_-]{2,16}$/;

// 폼 입력 함수
const InputValid = ({id, label, formData, setFormData, error, setError, inputProps}) => {

    // 유효성 검사
    const validateValue = (value) => {
        let result;

        if (value.length === 0) result = 'required';

        else {
            switch (id) {
                case 'email':
                    result = EMAIL_REGEX.test(value) ? 'noError' : 'emailPattern';
                    break;
                case 'password':
                    result = PASSWORD_REGEX.test(value) ? 'noError' : 'pwPattern';
                    break;
                case 'id':
                    result = ID_REGEX.test(value) ? 'noError' : 'idPattern';
                    break;
                case 'nickname':
                    result = NICKNAME_REGEX.test(value) ? 'noError' : 'nicknamePattern';
                    break;
                default:
                    result = 'noError';
                    return;
            }
        }

        if (result === 'noError') {
            setError({...error, [id]: result});
        } else {
            setError({...error, [id]: ERROR_MSG[result]});
        }
    };

    // 중복 검사 진행
    // const checkDuplication = async (errorMsg) => {
    //     try {
    //         const data = await validateForm(id, formData);
    //         if (data.message === errorMsg) {
    //             setError({...error, [id]: data.message});
    //         } else if (data.message === '잘못된 접근입니다.') {
    //             throw Error(data.message);
    //         } else {
    //             setError({...error, [id]: 'noError'});
    //         }
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // };

    // 실시간 db 중복 검사 진행
    useEffect(() => {
        if (!['email'].includes(id)) {
            return;
        }

        if ((id === 'email' && !EMAIL_REGEX.test(formData.email))) {
            return;
        }

        const errorMsg = id === 'email' ? '이미 가입된 이메일 주소 입니다.' : '이미 가입된 계정 ID 입니다.';

        const timer = setTimeout(() => {
            // checkDuplication(errorMsg);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [formData.email]);

    // 값 변경 시 실행되는 핸들러 & 에러 메시지 여부 확인
    const handleChange = (event) => {
        const {value} = event.target;
        validateValue(value);
        setFormData({...formData, [id]: value});
    };

    // 유효 값
    let isValid = false;
    if (error[id] !== 'noError' && error[id] !== '') {
        isValid = true;
    }

    return (
        <div className="container">
            <label htmlFor={id} className="label">{label}</label>
            <input
                id={id}
                className="style-input"
                {...inputProps}
                value={formData[id]}
                data-isValid={isValid}
                onChange={handleChange}
                onKeyDown={inputProps.onKeyDown}
            />
            {isValid && <span className="error-message">{`* ${error[id]}`}</span>}
        </div>
    );
};

export default InputValid;