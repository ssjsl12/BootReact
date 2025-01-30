package com.example.bootreact.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;  // 쪽지 번호

    private String sender; // 보낸 사람

    private String receiver; // 받는 사람

    @Column(nullable = false)
    private String messageTitle;

    @Column(nullable = false, length = 1000)
    private String messageContent; // 쪽지 내용

    @Column(nullable = false)
    private LocalDateTime sendTime; // 보낸 시간

    @Column(nullable = false)
    private boolean messageCheck; // 확인 여부 (true: 읽음, false: 안 읽음)


}
