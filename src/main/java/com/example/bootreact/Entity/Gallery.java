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

    private String galleryName; // 갤러리 이름 (예: 리그 오브 레전드, 오버워치)

    private String description; // 갤러리 설명
}