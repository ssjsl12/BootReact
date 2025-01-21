import axios from "axios";
import React, { useEffect, useState } from "react";
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
    }



  return (

      <div className="login-form">

          <div>
              <h1>회원가입</h1>
              <form onSubmit={handleJoin}>
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
                      <label htmlFor="Email">이메일</label>
                      <input
                          type="email"
                          id="password"
                          value={form.password}
                      />
                  </div>

                  <div>
                      <button type="submit">회원가입</button>
                  </div>
              </form>

          </div>

      </div>

  );


};

export default JoinForm;
