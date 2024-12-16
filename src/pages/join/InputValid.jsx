import React, {useEffect} from 'react';

// 유효성 검사 실패 시 노출되는 메시지
const ERROR_MSG = {
    required: '필수 입력사항을 입력해주세요.',
    emailPattern: '잘못된 이메일 형식입니다.',
    pwPattern: '비밀번호는 대/소문자, 숫자 6자 이상만 허용합니다.',
    idPattern: '2~16자 이내의 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.',
};

const EMAIL_REGEX = /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const PASSWORD_REGEX = /^[A-Za-z0-9]{6,}$/;
const ID_REGEX = /^[a-z0-9A-Z_.]{2,16}$/;

// 폼 입력 함수
const InputValid = ({ id, label, formData, setFormData, error, setError, inputProps }) => {
    // const {userAccountName} = useContent();

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
                    result = ID_REGEX.test(value) ? 'loading' : 'idPattern';
                    break;
                // case 'accountName':
                //     if (value === userAccountName) result = 'noError';
                //     else result = ID_REGEX.test(value) ? 'loading' : 'idPattern';
                //     break;
                default:
                    result = 'noError';
                    return;
            }
        }

        if (result === 'noError' || result === 'loading') {
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

    // 실시간 중복 검사 진행
    useEffect(() => {
        if (!['email', 'accountName'].includes(id)) return;

        if (
            (id === 'email' && !EMAIL_REGEX.test(formData.email))
            // (id === 'accountName' && !ID_REGEX.test(formData.accountName)) ||
            // formData['accountName'] === userAccountName
        ) {
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
    // }, [formData.email, formData.accountName]);

    // 값 변경 시 실행되는 핸들러 & 에러 메시지 여부 확인
    const handleChange = (event) => {
        const {value} = event.target;
        validateValue(value);
        setFormData({...formData, [id]: value});
    };

    // 유효 값
    let isInvalid = false;
    if (error[id] !== 'loading' && error[id] !== 'noError' && error[id] !== '') {
        isInvalid = true;
    }

    return (
        <div className="container">
            <label htmlFor={id} className="label">{label}</label>
            <input
                id={id}
                className="style-input"
                {...inputProps}
                value={formData[id]}
                isInvaild={isInvalid}
                onChange={handleChange}
            />
            {isInvalid && <span className="error-message">{`* ${error[id]}`}</span>}
        </div>
    );
};

export default InputValid;