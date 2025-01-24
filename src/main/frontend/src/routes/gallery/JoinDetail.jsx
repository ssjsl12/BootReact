import axios from "axios";
import React, { useEffect, useState } from "react";
import './css/join.css'
import {Await, useNavigate, useParams} from "react-router-dom";

//회원가입 폼
const JoinForm = () => {

    const [form ,setForm] = useState([]);

    var authCode;

    useEffect(() => {
        axios.get(`/join`)
            .then(res => setForm(res.data))
            .catch(err => console.error(err));

    }, []);

    function handleJoin(){

        const id = document.getElementById('id').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const nickname = document.getElementById('nickname').value;
        const phone = document.getElementById('phone').value;

        axios.post(`/join`, {
           id, nickname, email, password,phone
        })
            .then(response => {

                alert("회원가입에 성공하였습니다.");

            })
            .catch(error => {
                alert("회원가입을 다시 시도해주세요.");
            });
    }

    function emailAuth() {
        const email = document.getElementById('email').value;

        // URL 경로에 '/' 추가 (상대 경로 또는 절대 경로 확인)
        axios.post('/auth/email', {
            email: email // Key와 value가 같다면 'email'로 생략 가능
        })
            .then(response => {
                console.log("인증 요청 완료 인증 번호 : ", response.data); // 응답 데이터를 출력
                document.getElementById('auth-code-container').style.display = 'block';
                authCode = response.data;
            })
            .catch(error => {
                console.error("인증 요청 실패", error); // 오류 메시지와 함께 출력
            });
    }

    function verifyAuthCode(auth_code)
    {
        if(authCode === auth_code)
        {
            document.getElementById('auth-code-container').style.display = 'none';
            alert("인증에 성공했습니다! 🎉"); // 알람 표시
        }
        else
        {
            alert("잘못된 인증번호입니다. 다시 시도해주세요."); // 알람 표시
        }
    }



  return (
      <div className="join-form">
          <div>
              <h1>회원가입</h1>
              <form className="form-container">
                  <div>
                      <label htmlFor="id">아이디</label>
                      <input
                          type="text"
                          id="id"
                          value={form.id}
                      />
                  </div>
                  <div>
                      <label htmlFor="nickname">닉네임</label>
                      <input
                          type="text"
                          id="nickname"
                          value={form.nickname}
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
                      <label htmlFor="email">이메일</label>
                      <input
                          type="email"
                          id="email"
                          value={form.email}
                      />
                      <button className="email-auth" type="button" onClick={emailAuth}>
                          인증
                      </button>
                  </div>
                  <div id="auth-code-container" style={{display: 'none', marginTop: '10px'}}>
                      <label htmlFor="auth-code">인증번호</label>
                      <input
                          type="email"
                          id="auth-code"
                          placeholder="인증번호를 입력하세요"
                      />
                      <button
                          className="verify-auth-code"
                          type="button"
                          onClick={() => verifyAuthCode(document.getElementById('auth-code').value)}
                      >
                          인증번호 확인
                      </button>
                  </div>
                  <div>
                      <label htmlFor="phone">휴대폰</label>
                      <input
                          type="text"
                          id="phone"
                          value={form.phone}
                      />
                  </div>
                  <div>
                      <button type="button" onClick={handleJoin}>
                          회원가입
                      </button>
                  </div>
              </form>
          </div>
      </div>


  );


};

export default JoinForm;
