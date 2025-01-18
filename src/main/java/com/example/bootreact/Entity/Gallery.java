package com.example.bootreact.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Gallery {

    @Id
    @Column(name = "gallery_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;

    @ManyToOne
    @JoinColumn(name = "cate_type")
    private GalleryCategory category;

    private String galleryKorName; // 갤러리 이름 (예: 리그오브레전드)
    private String url; // 갤러리 주소

    private String description; // 갤러리 설명
}