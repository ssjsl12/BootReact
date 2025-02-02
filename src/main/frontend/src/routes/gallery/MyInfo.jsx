import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import "./css/myinfo.css"

const MyInfo = ({isAuthenticated}) =>
{
    const navigate = useNavigate();  // useNavigate 훅 사용

    useEffect(() => {

      /*  if(!isAuthenticated)
        {
            navigate("/login");
            return;
        }
        */



    })

    return (
        <div className="my-info">
            <div className="info-header">
                <h1> 개인 정보 </h1>
                <div> 다양한 서비스에서 사용되는 나와 내 환경서정에 대한 관한 정보입니다.</div>
            </div>

            <div className="basic-info">
                <div className="basic-info-Description">
                    <h1> 개인 정보 </h1>
                    <div>일부 정보가 서비스를 사용하는 다른 사람에게 표시될 수 있습니다.</div>
                </div>

                <div className="basic-info-1">
                    <div>이름</div>
                    <div>----</div>
                </div>
                <div className="underline-custom"></div>

                <div className="basic-info-1">
                    <div>생년월일</div>
                    <div>----</div>
                </div>
                <div className="underline-custom"></div>
                <div className="basic-info-2">
                    <div>성별</div>
                    <div>----</div>
                </div>
            </div>

            <div className="basic-info">
                <div className="basic-info-Description">
                    <h1> 연락처 정보 </h1>
                </div>

                <div className="basic-info-1">
                    <div>이메일</div>
                    <div>----</div>
                </div>
                <div className="underline-custom"></div>

                <div className="basic-info-2">
                    <div>휴대전화</div>
                    <div>----</div>
                </div>
            </div>


        </div>
    );


}


export default MyInfo