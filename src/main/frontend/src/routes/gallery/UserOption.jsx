import React, { useState } from "react";
import "./css/userOption.css";
import MessageModal from "./MessageModal";

const UserOption = ({receiver , isAuthenticated}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    if(!isAuthenticated)
    {
        alert("로그인 후 사용해주세요");
    }
    return (
        <div className="user-option">
                <div className="auth-options">
                    <button onClick={() => setIsModalOpen(true)}>✉️ 쪽지 보내기</button>
                    <button onClick={() => alert("정보 보기 클릭!")}>ℹ️ 정보 보기</button>
                </div>

            <MessageModal isOpen={isModalOpen}  isAuthenticated = {isAuthenticated} userinfo = {receiver} onClose={() => setIsModalOpen(false)} />

        </div>
    );
};

export default UserOption;
