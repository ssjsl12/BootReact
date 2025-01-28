package com.example.bootreact.Service;

import com.example.bootreact.DTO.CommentDTO;
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

    //게시글 추가
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

        boardPost.setUpdatedAt(LocalDateTime.now());
        boardPost.setId(postDTO.getId());
        boardPost.setTitle(postDTO.getTitle());
        boardPost.setContent(postDTO.getContent());
        boardPost.setCreatedAt(LocalDateTime.now());
        boardPost.setGallery(gallery);

        boardPostRepository.save(boardPost);

    }


    //게시글 수정
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
        boardPost.setUpdatedAt(LocalDateTime.now());
        boardPost.setCreatedAt(LocalDateTime.now());

        boardPostRepository.save(boardPost);

    }

    public void deletePost(Long id)
    {
        boardPostRepository.deleteById(id);
    }


    //게시글 페이징 처리
    public Page<PostDTO> getPagingPost(PageRequest pageRequest , List<PostDTO> items) {

        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), items.size());


        List<PostDTO> pageContent = items.subList(start, end);
        return new PageImpl<>(pageContent, pageRequest, items.size());
    }


    //포스트 입력
    public PostDTO setPost(BoardPost post)
    {
        PostDTO postDTO = new PostDTO();

        postDTO.setting(post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getAuthor(),
                post.getUpdatedAt(),
                post.getViews(),
                post.getPassword(),
                post.isAuthenticated(),
                post.getRecommend(),
                post.getNotrecommend());

        postDTO.setComments(post.getComments().stream()
                .map(comment -> new CommentDTO(comment.getId(), comment.getContent(), comment.getAuthor(), comment.getCreatedAt() , comment.getPassword()))
                .toList());

        return postDTO;
    }

    public void commendPost(Long no , Long type)
    {
        if(type == 1)
        {
                boardPostRepository.incrementRecommendCount(no);
        }
        else
        {
            boardPostRepository.decrementRecommendCount(no);
        }
    }

    public List<BoardPost> findGalleryNo(int galleryNo)
    {
        return boardPostRepository.findByGalleryNoLists(galleryNo);
    }

    // 조회수 기준 내림차순으로 게시글 가져오기
    public List<BoardPost> findByPostsSortedByCreate(int galleryNo) {
        return boardPostRepository.findByGalleryNoOrderByCreatedAtDesc(galleryNo);
    }

    // 조회수 기준 오름차순으로 게시글 가져오기 (선택)
    public List<BoardPost> findByPostsSortedByViews(int galleryNo) {
        return boardPostRepository.findByGalleryNoOrderByViewsDesc(galleryNo);
    }

    // 조회수 기준 오름차순으로 게시글 가져오기 (선택)
    public List<BoardPost> findByPostsSortedByCommended(int galleryNo) {
        return boardPostRepository.findByGalleryNoOrderByRecommendDesc(galleryNo);
    }


}
