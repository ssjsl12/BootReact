import React, { useState } from "react";
import axios from "axios";
import "./css/messageModal.css"; // 모달 스타일

const MessageModal = ({ isOpen, onClose }) => {
    const [receiver, setReceiver] = useState("");
    const [messageContent, setContent] = useState("");
    const [messageTitle , setTitle] = useState("");
    const handleSend = async () => {
        if (!receiver || !messageContent || !messageTitle) {
            alert("받는 사람과 내용을 입력하세요.");
            return;
        }

        try {
            const response = await axios.post("/messages/send", {
                messageTitle,
                receiver,
                messageContent,
            });
            alert(response.data); // 서버에서 온 메시지 출력
            onClose(); // 모달 닫기
        } catch (error) {
            alert("쪽지 전송에 실패했습니다.");
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>쪽지 보내기</h2>
                <input
                    type="text"
                    placeholder="받는 사람"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />
                <input
                    placeholder="제목을 입력하세요."
                    value={messageTitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="내용을 입력하세요."
                    value={messageContent}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="modal-buttons">
                    <button onClick={handleSend}>보내기</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;
