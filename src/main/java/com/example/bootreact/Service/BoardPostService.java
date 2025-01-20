package com.example.bootreact.Service;

import com.example.bootreact.DTO.PostDTO;
import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Gallery;
import com.example.bootreact.Repository.BoardPostRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Log4j2
@Transactional
public class BoardPostService {

    @Autowired
    private BoardPostRepository boardPostRepository;


    public List<BoardPost> findGalleryNo(int galleryNo)
    {
        return boardPostRepository.findByGalleryNo(galleryNo);
    }

    public void writePost(Gallery gallery, PostDTO postDTO)
    {
        BoardPost boardPost = new BoardPost();

        boardPost.setTitle(postDTO.getTitle());
        boardPost.setContent(postDTO.getContent());
        boardPost.setAuthor(postDTO.getAuthor());
        boardPost.setCreatedAt(LocalDateTime.now());
        boardPost.setGallery(gallery);

        boardPostRepository.save(boardPost);

    }



}
