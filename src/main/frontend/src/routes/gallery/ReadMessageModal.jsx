import React from "react";
import "./css/message.css";

const ReadMessageModal = ({ isOpen, onClose, message }) => {

    if (!isOpen || !message) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>📩 쪽지</h2>
                <p><strong>보낸 사람</strong> {message.senderNo}</p>
                <p><strong>제목</strong> {message.messageTitle}</p>
                <p><strong>내용</strong></p>
                <p className="message-text">{message.messageContent}</p>
                <p><strong>보낸 시간</strong> {new Date(message.sendTime).toLocaleString()}</p>

                <button onClick={onClose} className="close-btn">닫기</button>
            </div>
        </div>
    );
};

export default ReadMessageModal;