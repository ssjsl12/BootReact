package com.example.bootreact.Service;

import com.example.bootreact.DTO.CommentDTO;
import com.example.bootreact.Entity.Comment;
import com.example.bootreact.Repository.CommentRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Log4j2
@Transactional
public class CommentService
{
    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getComment(int id)
    {
        List<Comment> lists = commentRepository.findByPost_Id(id);

        return lists;
    }



}
