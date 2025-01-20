package com.example.bootreact.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "board_post")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment
    private Long id; // 게시글 ID

    @Column(nullable = false, length = 100) // 제목 최대 길이 제한
    private String title;

    @Lob // 대용량 텍스트를 위한 설정
    @Column(nullable = false)
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