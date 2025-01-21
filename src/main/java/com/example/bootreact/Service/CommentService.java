package com.example.bootreact.Service;

import com.example.bootreact.DTO.CommentDTO;
import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Comment;
import com.example.bootreact.Repository.BoardPostRepository;
import com.example.bootreact.Repository.CommentRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Log4j2
@Transactional
public class CommentService
{
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BoardPostRepository postRepository;

    public void AddComment(CommentDTO commentDTO , int postId)
    {
        BoardPost post = postRepository.findById(postId);

        Comment comment = new Comment();

        comment.setAuthor(commentDTO.getAuthorName());
        comment.setContent(commentDTO.getContent());
        comment.setPassword(commentDTO.getPassword());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setPost(post);

        commentRepository.save(comment);
    }



}
