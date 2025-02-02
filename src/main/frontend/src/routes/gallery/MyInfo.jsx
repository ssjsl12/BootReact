import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import "./css/myinfo.css"
import axios from "axios";

const MyInfo = ({isAuthenticated}) =>
{
    const navigate = useNavigate();  // useNavigate 훅 사용
    const[user, setUser] = useState([]);
    useEffect(() => {

       if(!isAuthenticated)
        {
            navigate("/login");
            return;
        }


        axios.get(`/get/user`)
            .then(res => setUser(res.data)) // 데이터 받아서 상태 업데이트
            .catch(err => console.error("Error fetching post:", err));
    },[]);


    function passwordInput()
    {
        navigate("/rePassword");
    }


    return (
        <div className="my-info">
            <div className="info-header">
                <h1> 개인 정보 </h1>
                <div> 다양한 서비스에서 사용되는 나와 내 환경서정에 대한 관한 정보입니다.</div>
            </div>

            <div className="basic-info">
                <div className="basic-info-Description">
                    <h1> 기본 정보 </h1>
                    <div>일부 정보가 서비스를 사용하는 다른 사람에게 표시될 수 있습니다.</div>
                </div>

                <div className="basic-info-1">
                    <div>닉네임</div>
                    <div>{user.nickname}</div>
                </div>
                <div className="underline-custom"></div>

                <div className="basic-info-1">
                    <div>생년월일</div>
                    <div>{user.birth}</div>
                </div>
                <div className="underline-custom"></div>
                <div className="basic-info-2">
                    <div>성별</div>
                    <div>{user.gender}</div>
                </div>
            </div>

            <div className="basic-info">
                <div className="basic-info-Description">
                    <h1> 연락처 정보 </h1>
                </div>

                <div className="basic-info-1">
                    <div>이메일</div>
                    <div>{user.email}</div>
                </div>
                <div className="underline-custom"></div>

                <div className="basic-info-2">
                    <div>휴대전화</div>
                    <div>{user.phone}</div>
                </div>
            </div>


            <div className="password-info">
                <div className="basic-info-Description">
                    <h1> 비밀번호 </h1>
                    <div>안전한 비밀번호를 사용하면 계정을 보호하는데 도움이 됩니다.</div>
                </div>

                <div
                    className="basic-info-1 password-container"
                    onClick={() => passwordInput()}
                >
                    <div>비밀번호</div>
                    <div className="password-input">**************</div>
                </div>
                <div className="basic-info-2"></div>

            </div>

        </div>
    );


}


export default MyInfo