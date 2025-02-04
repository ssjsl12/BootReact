package com.example.bootreact.Controller;

import com.example.bootreact.Constant.GalleryType;
import com.example.bootreact.DTO.CommentDTO;
import com.example.bootreact.DTO.PostDTO;
import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Gallery;
import com.example.bootreact.Entity.GalleryCategory;
import com.example.bootreact.Service.BoardPostService;
import com.example.bootreact.Service.GalleryService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@Log4j2
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @Autowired
    private BoardPostService boardPostService;

    public String currentType = "none";


    @GetMapping("/category/{type}")
    public List<GalleryCategory> getGalleryCategories(@PathVariable("type") String type) {

        GalleryType galleryType = GalleryType.valueOf(type);  // 대소문자 구분 없이 처리

        List<GalleryCategory> list = galleryService.getGalleryCategoriesByType(galleryType);
        return list;
    }

    @GetMapping("/galleries/{type}")
    public List<Gallery> getGalleries(@PathVariable("type")String type) {

        GalleryType galleryType = GalleryType.valueOf(type);

        List<Gallery> list = galleryService.getGalleriesByCategoryNo(galleryType);

        return list;
    }

    //게시글 리스트
    @GetMapping("/{category}/{url}/{page}/{type}")
    public Page<PostDTO> getGalleryById(@PathVariable("category") String category, @PathVariable("url") String url,@PathVariable("page") int page
        ,@PathVariable("type") String type)
    {

        // galleryService를 통해 Gallery 객체를 가져옵니다.
        Gallery gallery = galleryService.getGalleryByUrl(url);

        // gallery에서 No 값을 가져옵니다.
        int galleryNo = gallery.getNo();

        // 해당 galleryNo에 해당하는 게시글 목록을 찾습니다.
        List<BoardPost> list = null;
        switch (type)
        {
            case "none":
                list  = boardPostService.findGalleryNo(galleryNo);
                break;
            case "views":
                list  = boardPostService.findByPostsSortedByViews(galleryNo);
                break;
            case "best":
                list = boardPostService.findByPostsSortedByCommended(galleryNo);
                break;
            case "updates":
                list  = boardPostService.findByPostsSortedByCreate(galleryNo);
                break;
        }

        currentType = type;

        // PostDTO 리스트로 변환하여 반환할 리스트
        List<PostDTO> postDTOList = new ArrayList<>();

        // BoardPost 리스트를 PostDTO 리스트로 변환
        for (BoardPost post : list) {
            PostDTO postDTO = new PostDTO();

            // BoardPost에서 PostDTO로 필요한 정보를 설정
            postDTO.setting(post.getId(), post.getTitle(), post.getContent(),
                    post.getAuthor(), post.getUpdatedAt() , post.getViews()
            ,null , post.isAuthenticated() , post.getRecommend(), post.getNotrecommend());

            // 댓글 목록을 DTO로 변환하여 추가
            postDTO.setComments(post.getComments().stream()
                    .map(comment -> new CommentDTO(comment.getId(), comment.getContent(),
                            comment.getAuthor(), comment.getCreatedAt() , comment.getPassword()))
                    .collect(Collectors.toList()));

            // 변환된 PostDTO를 리스트에 추가
            postDTOList.add(postDTO);
        }

        PageRequest pageRequest = PageRequest.of(page, 5);
        Page<PostDTO> pagePostDto = boardPostService.getPagingPost(pageRequest, postDTOList);

        // 변환된 PostDTO 리스트 반환
        return pagePostDto;
    }

    @GetMapping("/best/post/{page}")
    public Page<PostDTO> getGalleryById(@PathVariable("page") int page)
    {

        List<BoardPost> list = null;

        list  = boardPostService.findByPostsSortedByViews();

        List<PostDTO> postDTOList = new ArrayList<>();
        for (BoardPost post : list) {
            PostDTO postDTO = new PostDTO();

            // BoardPost에서 PostDTO로 필요한 정보를 설정
            postDTO.setting(post.getId(), post.getTitle(), post.getContent(),
                    post.getAuthor(), post.getUpdatedAt() , post.getViews()
                    ,null , post.isAuthenticated() , post.getRecommend(), post.getNotrecommend());

            // 댓글 목록을 DTO로 변환하여 추가
            postDTO.setComments(post.getComments().stream()
                    .map(comment -> new CommentDTO(comment.getId(), comment.getContent(),
                            comment.getAuthor(), comment.getCreatedAt() , comment.getPassword()))
                    .collect(Collectors.toList()));

            // 변환된 PostDTO를 리스트에 추가
            postDTOList.add(postDTO);
        }


        PageRequest pageRequest = PageRequest.of(page, 10);
        Page<PostDTO> pagePostDto = boardPostService.getPagingPost(pageRequest, postDTOList);

        return pagePostDto;

    }

}
