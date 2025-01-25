package com.example.bootreact.Entity;

import com.example.bootreact.DTO.CommentDTO;
import jakarta.persistence.*;
import jdk.jfr.Name;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "board_post")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardPost {

    @Id
    @Column(name ="post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment
    private int id; // 게시글 ID

    @Column(nullable = false, length = 100) // 제목 최대 길이 제한
    private String title;

    @Lob // 대용량 텍스트를 위한 설정
    @Column(nullable = false , length = 10000)
    private String content;

    @Column(nullable = false, length = 50)
    private String author;

    @Column(nullable = false)
    private int views = 0; // 조회수 기본값 0

    @Column(nullable = false, updatable = false) // 최초 생성 시간은 수정되지 않음
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "gallery_no")
    private Gallery gallery;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "post",fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>(); // 댓글 리스트

    @Column(nullable = false)
    private boolean isAuthenticated;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // 조회수 증가 메서드
    public void incrementViews() {
        this.views++;
    }
}