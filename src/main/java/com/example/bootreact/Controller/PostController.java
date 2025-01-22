package com.example.bootreact.Controller;

import com.example.bootreact.DTO.CommentDTO;
import com.example.bootreact.DTO.PostDTO;
import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Comment;
import com.example.bootreact.Entity.Gallery;
import com.example.bootreact.Service.BoardPostService;
import com.example.bootreact.Service.GalleryService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@Log4j2
public class PostController {

    @Autowired
    BoardPostService boardPostService;

    @Autowired
    private GalleryService galleryService;

    @GetMapping("{category}/{url}/write")
    public PostDTO Write(@PathVariable("category") String category, @PathVariable("url")String url)
    {
        // 새로운 게시글을 위한 빈 DTO 객체 반환
        PostDTO postDTO = new PostDTO();
        postDTO.setTitle("");  // 제목은 빈 값
        postDTO.setContent(""); // 내용도 빈 값
        postDTO.setAuthor(""); // 작성자도 빈 값

        return postDTO;
    }

    @PostMapping("{category}/{url}/write")
    public @ResponseBody ResponseEntity postWrite(@RequestBody PostDTO postDTO ,
                                                  @PathVariable("category") String category,
                                                  @PathVariable("url")String url, Principal principal)
    {
        Gallery gallery =  galleryService.getGalleryByUrl(url);

        boardPostService.writePost(gallery, postDTO , principal);

        return ResponseEntity.ok().build();
    }

    //게시글 상세 보기
    //댓글도 같이 들고와야함.
        @GetMapping("{category}/{url}/detail/{no}")
        public PostDTO viewPost(@PathVariable("category") String category
                , @PathVariable("url")String url, @PathVariable("no")int no)
        {
            BoardPost post = boardPostService.findById(no , true);

            PostDTO postDTO = new PostDTO();
            postDTO.setting(post.getId(),
                    post.getTitle(),
                    post.getContent(),
                    post.getAuthor(),
                    post.getUpdatedAt(),
                    post.getViews(), post.getPassword(),post.isAuthenticated());

            postDTO.setComments(post.getComments().stream()
                    .map(comment -> new CommentDTO(comment.getId(), comment.getContent(), comment.getAuthor(), comment.getCreatedAt() , comment.getPassword()))
                    .toList());

            return postDTO;
        }


        //게시글 수정 폼
    @GetMapping("{category}/{url}/modify/{no}")
    public PostDTO modifyPost(
                               @PathVariable("category") String category,
                               @PathVariable("url")String url,
                               @PathVariable("no")int no)
    {

        BoardPost boardPost = boardPostService.findById(no , false);

        PostDTO postDTO = new PostDTO();
        postDTO.setting(boardPost.getId(),
                boardPost.getTitle(),
                boardPost.getContent(),
                boardPost.getAuthor(),
                boardPost.getUpdatedAt(),
                boardPost.getViews(),
                boardPost.getPassword(),
                boardPost.isAuthenticated());


        return postDTO;
    }


    //게시글 수정 실행
    @PostMapping("{category}/{url}/modify/{no}")
    public @ResponseBody ResponseEntity modify( @RequestBody PostDTO postDTO ,
                                                @PathVariable("category") String category,
                                                @PathVariable("url")String url,
                                                @PathVariable("no")int no,
                                                Principal principal)
    {

        Gallery gallery =  galleryService.getGalleryByUrl(url);

        boardPostService.modifyPost(gallery, postDTO , principal);


        return ResponseEntity.ok().build();
    }

}
