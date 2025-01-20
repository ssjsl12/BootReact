package com.example.bootreact.Controller;

import com.example.bootreact.DTO.PostDTO;
import com.example.bootreact.Entity.Gallery;
import com.example.bootreact.Service.BoardPostService;
import com.example.bootreact.Service.GalleryService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
public class PostController {

    @Autowired
    BoardPostService boardPostService;

    @Autowired
    private GalleryService galleryService;

    @GetMapping("{category}/{url}/write")
    public PostDTO post(@PathVariable("category") String category, @PathVariable("url")String url)
    {

        // 새로운 게시글을 위한 빈 DTO 객체 반환
        PostDTO postDTO = new PostDTO();
        postDTO.setTitle("");  // 제목은 빈 값
        postDTO.setContent(""); // 내용도 빈 값
        postDTO.setAuthor(""); // 작성자도 빈 값

        return postDTO;
    }

    @PostMapping("{category}/{url}/write")
    public @ResponseBody ResponseEntity postWrite( @RequestBody PostDTO postDTO ,
                                                   @PathVariable("category") String category,
                                                   @PathVariable("url")String url)
    {
        Gallery gallery =  galleryService.getGalleryByUrl(url);

        boardPostService.writePost(gallery, postDTO);

        return ResponseEntity.ok().build();
    }


}
