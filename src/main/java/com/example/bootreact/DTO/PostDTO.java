package com.example.bootreact.DTO;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PostDTO {

    int id;
    String title;
    String content;
    String author;
    LocalDateTime updateTime;
    String password;
    int views;
    int recommend;
    int notrecommend;
    boolean isAuthenticated;

    private List<CommentDTO> comments = new ArrayList<>(); // 댓글 리스트 포함
    public void setting(int id, String title, String content, String author ,
                        LocalDateTime updateTime , int views ,String password, boolean isAuthenticated , int recommend , int notRecommended) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.updateTime = updateTime;
        this.views = views;
        this.password = password;
        this.isAuthenticated = isAuthenticated;
        this.recommend = recommend;
        this.notrecommend = notRecommended;
    }

}
