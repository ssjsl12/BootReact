import React, {useState , useEffect} from "react";
import './css/message.css'
import MessageModal from "./MessageModal";
import ReadMessageModal from "./ReadMessageModal";
import axios from "axios";
const Message = () =>
{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReadModalOpen, setReadModalOpen] = useState(false);
    const [messages, setMessages] = useState([]); // 받은 쪽지 목록 상태
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchReceivedMessages();
    }, []);

    // 받은 쪽지 목록 불러오기
    const fetchReceivedMessages = async () => {
        try {
            const response = await fetch("/messages/get", {
                credentials: "include", // 쿠키/세션 포함 (인증 필요 시)
            });
            if (!response.ok) throw new Error("쪽지 데이터를 불러오지 못했습니다.");
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("쪽지 불러오기 실패:", error);
        }
    }



    const deleteMessage = async (messageId) => {

        console.log(messageId);

        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            const response = await fetch(`/messages/${messageId}`, {
                method: "DELETE",
                credentials: "include", // 인증 포함 (쿠키/세션 유지)
            });

            if (!response.ok) throw new Error("쪽지 삭제 실패");

            alert("쪽지가 삭제되었습니다.");
            setMessages(messages.filter(msg => msg.id !== messageId)); // UI에서 삭제 반영
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
        }
    };

    const readMessage = (message) => {
        setSelectedMessage(message);
        setReadModalOpen(true);

        axios.post(`/meesage/check`, message)
            .then(res => {
                window.location.reload();
                console.log(res);
            })
            .catch(error => {
                alert(error);
            })
    };



    return (

        <div className="message-group">
            <h1>쪽지함</h1>
            <div className="message-option">
                <div className="btn-detail-group">
                    <button onClick={() => setIsModalOpen(true)}>쪽지 보내기</button>
                </div>
                <div className="message-item-group">
                    <span className="sender">보낸사람</span>
                    <span className="send-title">제목</span>
                    <span className="send-time">보낸시간</span>
                    <span className="receipt-check">수신확인</span>
                    <span className="delete-message">쪽지삭제</span>
                </div>


                {/* 받은 쪽지 목록 */}
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div className="message-item-group" key={msg.id} onClick={() => readMessage(msg)}>
                            <span className="sender">{msg.senderNo}</span>
                            <span className="send-title">{msg.messageTitle}</span>
                            <span className="send-time">{new Date(msg.sendTime).toLocaleString()}</span>
                            <span className="receipt-check">{msg.messageCheck ? "✅ 읽음" : "❌ 안 읽음"}</span>
                            <span>   <button
                                className="delete-message"
                                onClick={(event) => {
                                    event.stopPropagation(); // 이벤트 전파 막기
                                    deleteMessage(msg.id);
                                }}
                            >
                            🗑️
                            </button></span>
                        </div>
                    ))
                ) : (
                    <p className="no-messages">📭 받은 쪽지가 없습니다.</p>
                )}

            </div>


            <MessageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <ReadMessageModal isOpen={isReadModalOpen} message={selectedMessage} onClose={() => setReadModalOpen(false)} />
        </div>


    );

}

export default Message;