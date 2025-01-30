package com.example.bootreact.DTO;

import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Scrap;
import com.example.bootreact.Entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ScrapDTO {


    private int id;
    private String postTitle;
    private String postContent;
    private String author;
    private LocalDateTime postDate;
    private int views;
    private int recommends;
    private int category;
    private int galleryId;

    public ScrapDTO(Scrap scrap) {

        this.id = scrap.getPost().getId();
        this.postTitle = scrap.getPost().getTitle();
        this.postContent = scrap.getPost().getContent();
        this.author = scrap.getPost().getAuthor();
        this.postDate = scrap.getPost().getCreatedAt();
        this.views = scrap.getPost().getViews();
        this.recommends = scrap.getPost().getRecommend();
        this.galleryId = scrap.getPost().getGallery().getNo();
        this.category = scrap.getPost().getGallery().getCategory().getNo();

    }


}
