package com.example.bootreact.Service;

import com.example.bootreact.DTO.PostDTO;
import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Gallery;
import com.example.bootreact.Entity.User;
import com.example.bootreact.Repository.BoardPostRepository;
import com.example.bootreact.Repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Log4j2
@Transactional
public class BoardPostService {

    @Autowired
    private BoardPostRepository boardPostRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public BoardPost findById(int id , boolean _isRead) {

        BoardPost boardPost = boardPostRepository.findById(id);

        if(_isRead) {
            boardPost.incrementViews();
            boardPostRepository.save(boardPost);
        }

        return boardPost;
    }

    public List<BoardPost> findGalleryNo(int galleryNo)
    {
        return boardPostRepository.findByGalleryNoLists(galleryNo);
    }

    public void writePost(Gallery gallery, PostDTO postDTO , Principal principal)
    {
        BoardPost boardPost = new BoardPost();

        if (principal != null) {
            String username = principal.getName(); // 사용자 아이디

            User user = userRepository.findById(username);

            boardPost.setAuthor(user.getId()); // 작성자를 현재 로그인된 사용자로 설정
            boardPost.setPassword(user.getPassword());  // 비밀번호는 null 또는 필요에 따라 처리
            boardPost.setAuthenticated(true);
        } else {

            boardPost.setAuthor(postDTO.getAuthor());
            boardPost.setPassword(passwordEncoder.encode(postDTO.getPassword()));
        }

        boardPost.setId(postDTO.getId());
        boardPost.setTitle(postDTO.getTitle());
        boardPost.setContent(postDTO.getContent());
        boardPost.setCreatedAt(LocalDateTime.now());
        boardPost.setGallery(gallery);

        boardPostRepository.save(boardPost);

    }

    public void modifyPost(Gallery gallery, PostDTO postDTO , Principal principal)
    {
        BoardPost boardPost = new BoardPost();

        boardPost.setId(postDTO.getId());
        boardPost.setAuthor(postDTO.getAuthor());
        boardPost.setViews(postDTO.getViews());
        boardPost.setContent(postDTO.getContent());
        boardPost.setTitle(postDTO.getTitle());
        boardPost.setGallery(gallery);
        boardPost.setPassword(postDTO.getPassword());

        boardPostRepository.save(boardPost);

    }

    public Page<PostDTO> getPagingPost(PageRequest pageRequest , List<PostDTO> items) {

        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), items.size());


        List<PostDTO> pageContent = items.subList(start, end);
        return new PageImpl<>(pageContent, pageRequest, items.size());
    }



}
