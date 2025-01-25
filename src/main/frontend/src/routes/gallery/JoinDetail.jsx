import axios from "axios";
import React, { useEffect, useState } from "react";
import './css/join.css'
import {Await, useNavigate, useParams} from "react-router-dom";

//회원가입 폼
const JoinForm = () => {

    const [form ,setForm] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false); // 비활성화 상태
    const [authSuc, setauthSuc] = useState(false); // 비활성화 상태
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

        if(!authSuc) {

            alert("이메일 인증을 해주세요");
            return;
        }
        axios.post(`/join`, {
           id, nickname, email, password,phone
        })
            .then(response => {

                alert("회원가입에 성공하였습니다.");

            })
            .catch(error => {
                // 서버에서 반환한 에러 메시지를 사용자에게 표시
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                    document.getElementById('email-auth').style.display = 'block';
                    setIsDisabled(false); // 입력 필드 비활성화
                    setauthSuc(false);
                } else {
                    alert("회원가입을 다시 시도해주세요.");
                }
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
                document.getElementById('auth-code-container').style.display = 'flex';
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
            document.getElementById('email-auth').style.display = 'none';
            setIsDisabled(true); // 입력 필드 비활성화
            setauthSuc(true);
            alert("인증에 성공했습니다! 🎉"); // 알람 표시
        }
        else
        {
            alert("잘못된 인증번호입니다. 다시 시도해주세요."); // 알람 표시
        }
    }

    function checkDuplicate(type, value) {
        if (!value) {
            alert(`${type === 'id' ? '아이디' : '닉네임'}를 입력해주세요.`);
            return;
        }

        axios
            .get(`/check-duplicate`, { params: { type, value } }) // 서버로 중복 확인 요청
            .then((response) => {
                if (response.data.isDuplicate) {
                    alert(`입력한 ${type === 'id' ? '아이디는' : '닉네임은'} 이미 사용 중입니다.`);
                } else {
                    alert(` 사용가능한 ${type === 'id' ? '아이디' : '닉네임'} 입니다`);
                }
            })
            .catch((error) => {
                console.error('중복 확인 요청 실패', error);
                alert('중복 확인 중 오류가 발생했습니다.');
            });
    }



  return (
      <div className="join-form">
          <div>
              <h1>회원가입</h1>
              <form className="form-container">
                  <div className="id-group">
                      <label htmlFor="id" className="id-label">아이디</label>
                      <input
                          type="text"
                          id="id"
                          className="id-input"
                          value={form.id}
                          onChange={(e) => setForm({...form, id: e.target.value})} // 입력 시 상태 업데이트
                      />
                      <button type="button" className="id-button" onClick={() => checkDuplicate('id', form.id)}>
                          중복 확인
                      </button>
                  </div>
                  <div className="id-group">
                      <label htmlFor="nickname">닉네임</label>
                      <input
                          type="text"
                          id="nickname"
                          className="id-input"
                          value={form.nickname}
                          onChange={(e) => setForm({...form, nickname: e.target.value})}
                      />
                      <button type="button" className="id-button" onClick={() => checkDuplicate('nickname', form.nickname)}>중복 확인</button>
                  </div>
                  <div className="id-group">
                      <label htmlFor="password">패스워드</label>
                      <input
                          type="password"
                          id="password"
                          className="id-input"
                          value={form.password}
                      />
                  </div>
                  <div className="id-group">
                      <label htmlFor="email">이메일</label>
                      <input
                          type="email"
                          id="email"
                          value={form.email}
                          className="id-input"
                          disabled={isDisabled} // 상태에 따라 활성화/비활성화
                      />
                      <button id="email-auth" className="email-auth" type="button" onClick={emailAuth}>
                          인증 요청
                      </button>
                  </div>
                  <div className="id-group" id="auth-code-container" style={{display: 'none'}}>
                      <label htmlFor="auth-code">인증번호</label>
                      <input
                          type="email"
                          id="auth-code"
                          className="auth-code"
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
                  <div className="id-group">
                      <label htmlFor="phone">휴대폰</label>
                      <input
                          type="text"
                          id="phone"
                          className="id-input"
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
