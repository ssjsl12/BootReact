import React from "react";
import './css/message.css'


const message = () =>
{





    return (

        <div className="message-group">
            <h1>쪽지함</h1>
            <div className="message-option">
                <div className="message-item-group">
                    <span className="sender">보낸사람</span>
                    <span className="send-time">보낸시간</span>
                    <span className="receipt-check">수신확인</span>
                    <span className="delete-message">쪽지삭제</span>

                </div>
                <div>

                    

                </div>

            </div>

        </div>


    );

}

export default message;