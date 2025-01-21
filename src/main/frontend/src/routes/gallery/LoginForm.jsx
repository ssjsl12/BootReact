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

        try {
            // FormData 생성
            const formData = new FormData();
            formData.append('id', id);
            formData.append('password', password);

            // 서버로 POST 요청
            const response = await axios.post('http://localhost:8080/login', formData);

            console.log(response.status);

            // 로그인 성공
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                alert('로그인 성공!');
            }
        } catch (err) {
            // 로그인 실패 처리
            if (err.response && err.response.status === 401) {
                console.error('로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.');
                alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
            } else {
                console.error('서버 오류:', err);
                alert('서버 오류가 발생했습니다. 잠시 후 다시 시도하세요.');
            }
        }
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
                        <button type="submit">로그인</button>
                    </div>
                </form>

                <button className="join-btn" onClick={() => navigate('/join')}>회원가입</button>
                <button className="join-btn" onClick={() => navigate('/findpwd')}>비밀번호 찾기</button>

            </div>

        </div>


    );

};

export default LoginForm;
