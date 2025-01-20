package com.example.bootreact.Repository;

import com.example.bootreact.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {


    List<Comment> findByPost_Id(int postId);
}
