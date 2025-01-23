import axios from "axios";
import React, { useEffect, useState } from "react";
import './css/join.css'
import {Await, useNavigate, useParams} from "react-router-dom";

const JoinForm = () => {

    const [form ,setForm] = useState([]);

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

            })
            .catch(error => {

            });



    }



  return (

      <div className="join-form">

          <div>
              <h1>회원가입</h1>
              <form>
                  <div>
                      <label htmlFor="id">아이디</label>
                      <input
                          type="id"
                          id="id"
                          value={form.id}
                      />
                  </div>
                  <div>
                      <label htmlFor="nickname">닉네임</label>
                      <input
                          type="nickname"
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
                      <label htmlFor="Email">이메일</label>
                      <input
                          type="email"
                          id="email"
                          value={form.password}
                      />
                  </div>

                  <div>
                      <label htmlFor="Email">휴대폰</label>
                      <input
                          type="phone"
                          id="phone"
                          value={form.password}
                      />
                  </div>

                  <div>
                      <button type="button" onClick={handleJoin}>회원가입</button>
                  </div>
              </form>

          </div>

      </div>

  );


};

export default JoinForm;
