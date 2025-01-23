import axios from "axios";
import React, { useEffect, useState } from "react";
import './css/login.css'
import {Await, useNavigate, useParams} from "react-router-dom";


const LoginForm = () => {

    const [form,SetForm] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/loginForm`)
            .then(res => SetForm(res.data))
            .catch(err => console.error(err));

    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const id = document.getElementById('id').value;
        const password = document.getElementById('password').value;
        const formData = new FormData();
        formData.append('id', id);
        formData.append('password', password);

        axios
            .post("/login", formData)
            .then((response) => {
                console.log("로그인 성공:", response);
                navigate("/gallery"); // 성공 시 React 라우트로 이동
                window.location.reload();

            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.error("로그인 실패:", error.response.data.message);
                    alert(error.response.data.message); // 알림 표시
                } else {
                    console.error("다른 에러 발생:", error);
                }
            });

    };

    return(

        <div className="login-form">

            <div>
                <h1>로그인</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="id">아이디</label>
                        <input
                            type="id"
                            id="id"
                            value={form.id}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">패스워드</label>
                        <input
                            type="password"
                            id="password"
                            value={form.password}
                        />
                    </div>

                    <div>
                        <button className="login-btn" type="submit">로그인</button>
                    </div>

                    <div className="join-btn-group">
                        <div className="join-btn" onClick={() => navigate('/join')}>회원가입</div>
                        <div className="join-btn" onClick={() => navigate('/findpwd')}>비밀번호 찾기</div>
                    </div>
                </form>

            </div>

        </div>


    );

};

export default LoginForm;
