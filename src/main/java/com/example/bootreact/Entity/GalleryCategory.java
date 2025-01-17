package com.example.bootreact.Entity;


import com.example.bootreact.Constant.GalleryType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class GalleryCategory {

    @Id
    @Column(name = "cate_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;

    @Enumerated(EnumType.STRING)
    private GalleryType galleryType;

    private String cateName;
}

