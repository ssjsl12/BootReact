package com.example.bootreact.DTO;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostDTO {

    int id;
    String title;
    String content;
    String author;
    LocalDateTime updateTime;
    private List<CommentDTO> comments;

    public void setting(int id, String title, String content, String author , LocalDateTime updateTime ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.updateTime = updateTime;
    }

}
