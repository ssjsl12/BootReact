import React, {useEffect, useState} from "react";
import axios from "axios";
import "./css/messageModal.css"; // 모달 스타일

const MessageModal = ({ isOpen, onClose , userinfo , isAuthenticated}) => {
    const [receiver, setReceiver] = useState("");
    const [messageContent, setContent] = useState("");
    const [messageTitle , setTitle] = useState("");

    if(!isAuthenticated)
        return;


    const handleCancel = () => {
        setReceiver(userinfo || "");  // userinfo 값으로 초기화
        setTitle("");  // 제목 초기화
        setContent("");  // 내용 초기화
        onClose();  // 모달 닫기 또는 다른 동작 수행
    };


    const handleSend = async () => {
        const finalReceiver = receiver || userinfo;

        console.log(finalReceiver);

        if (!finalReceiver  || !messageContent || !messageTitle) {
            alert("받는 사람과 내용을 입력하세요.");
            return;
        }

        try {
            const response = await axios.post("/messages/send", {
                messageTitle,
                receiver: finalReceiver,
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
                    value={receiver || userinfo}  // Set to userinfo if available
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
                    <button onClick={handleCancel}>취소</button>  {/* 취소 버튼 */}
                </div>
            </div>
        </div>
    );
};

export default MessageModal;
