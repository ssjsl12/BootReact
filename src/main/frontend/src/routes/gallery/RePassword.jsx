
import "./css/repassword.css"

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';  // useNavigate 사용
import axios from "axios"; // 눈 아이콘 추가

const RePassword = ({isAuthenticated}) =>
{
    const [password, setPassword] = useState("");
    const [checkPassword , setCheckPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // navigate 함수 선언

    const validatePassword = (password) => {
        const lengthCheck = password.length >= 8;
        const upperCheck = /[A-Z]/.test(password);
        const lowerCheck = /[a-z]/.test(password);
        const numberCheck = /[0-9]/.test(password);
        const specialCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            lengthCheck,
            upperCheck,
            lowerCheck,
            numberCheck,
            specialCheck
        };
    };

    const validation = validatePassword(password);
    const allValid = Object.values(validation).every(Boolean);
    const passwordsMatch = password === checkPassword && password.length > 0;

    const handleChangePassword = async () => {

        if(allValid)
        {
            if (!passwordsMatch) return;

            axios.post(`/changepassword?password=${password}`)
                .then(res =>
                {
                    navigate("/myinfo");
                })
                .catch(error =>{

                    alert("조건에 부합하지않거나 같은 비밀번호입니다.");
                });
        }
        else
        {
            alert("조건에 부합하지 않습니다");
        }
    }


    return (
        <div className="box">
            {/* 첫 번째 비밀번호 입력 */}
            <label className="password-wrapper">
                <input
                    type={showPassword1 ? "text" : "password"}
                    className="id-input"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword1(!showPassword1)}
                >
                    {showPassword1 ? <EyeOff /> : <Eye />}
                </button>
            </label>

            <div >
                비밀번호 안전성: 8자 이상 입력하세요. 다른 사이트에서 쓰는 비밀번호나 애완동물의 이름처럼 추측하기 쉬운 이름은 사용하지 마세요.
            </div>

            {/* 두 번째 비밀번호 입력 */}
            <label className="password-wrapper">
                <input
                    type={showPassword2 ? "text" : "password"}
                    className="id-input"
                    placeholder="비밀번호를 다시 입력해주세요"
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword2(!showPassword2)}
                >
                    {showPassword2 ? <EyeOff /> : <Eye />}
                </button>
            </label>

            <div className="password-hints">
                <p style={{ color: validation.lengthCheck ? "green" : "red" }}>
                    ✅ 8자 이상
                </p>
                <p style={{ color: validation.upperCheck ? "green" : "red" }}>
                    ✅ 대문자 포함 (A-Z)
                </p>
                <p style={{ color: validation.lowerCheck ? "green" : "red" }}>
                    ✅ 소문자 포함 (a-z)
                </p>
                <p style={{ color: validation.numberCheck ? "green" : "red" }}>
                    ✅ 숫자 포함 (0-9)
                </p>
                <p style={{ color: validation.specialCheck ? "green" : "red" }}>
                    ✅ 특수문자 포함 (!@#$%^&*)
                </p>
            </div>

            {allValid && <p className="success-message">✅ 강력한 비밀번호입니다!</p>}

            <button className="submit-btn" onClick={() => handleChangePassword()}>비밀번호 변경</button>
        </div>
    );

}

export default RePassword