package com.example.bootreact.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "post_comment")
@Getter
@Setter
@ToString
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // 댓글 고유 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private BoardPost post; // 댓글이 달린 게시글

    @Column(nullable = false)
    private String content; // 댓글 내용

    @Column(nullable = false)
    private String author; // 댓글 작성자

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // 작성일


}
