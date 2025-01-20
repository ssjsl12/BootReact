package com.example.bootreact.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDTO {

    private int id; // 댓글 고유 ID
    private String content; // 댓글 내용
    private String authorName; // 댓글 작성자 이름
    private LocalDateTime createdAt; // 작성일

    public CommentDTO() {}

    public CommentDTO(int id, String content, String author, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.authorName = author;
        this.createdAt = createdAt;
    }

    public void setting(int id, String content, String author, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.authorName = author;
        this.createdAt = createdAt;
    }

}
