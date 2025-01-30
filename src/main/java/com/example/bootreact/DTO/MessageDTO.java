package com.example.bootreact.DTO;

import com.example.bootreact.Entity.Message;
import com.example.bootreact.Entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageDTO {

    private Long no;  // 쪽지 번호
    private String senderNo; // 보낸 사람 ID
    private String receiver; // 받는 사람 ID
    private String messageContent; // 쪽지 내용
    private String messageTitle;
    private LocalDateTime sendTime; // 보낸 시간
    private boolean messageCheck; // 확인 여부 (true: 읽음, false: 안 읽음)

    public MessageDTO()
    {

    }

    public MessageDTO(Long no, String sender, String content , String title, LocalDateTime sendTime, boolean check) {
        this.no = no;
        this.senderNo = sender;
        this.messageTitle = title;
        this.sendTime = sendTime;
        this.messageCheck = check;
        this.messageContent = content;
    }


}
