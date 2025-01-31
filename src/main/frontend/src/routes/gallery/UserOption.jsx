import React, { useState } from "react";
import "./css/userOption.css";
import MessageModal from "./MessageModal";

const UserOption = (receiver) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="user-option">
                <div className="auth-options">
                    <button onClick={() => setIsModalOpen(true)}>✉️ 쪽지 보내기</button>
                    <button onClick={() => alert("정보 보기 클릭!")}>ℹ️ 정보 보기</button>
                </div>

            <MessageModal isOpen={isModalOpen}  userinfo = {receiver} onClose={() => setIsModalOpen(false)} />

        </div>
    );
};

export default UserOption;
