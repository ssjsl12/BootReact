package com.example.bootreact.Controller;

import com.example.bootreact.Entity.Comment;
import com.example.bootreact.Entity.User;
import com.example.bootreact.Repository.CommentRepository;
import com.example.bootreact.Repository.UserRepository;
import com.example.bootreact.Service.CommentService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Log4j2
public class PasswordController {


    private final PasswordEncoder passwordEncoder;

    @Autowired
    private CommentService commentService;
    @Autowired
    private CommentRepository commentRepository;

    public PasswordController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/verify-password")
    public ResponseEntity<Map<String, Object>> verifyPassword(@RequestBody Map<String, String> request)
    {
        String inputPassword = request.get("password");
        String postPassword = request.get("postPassword");

        boolean isValid = passwordEncoder.matches(inputPassword, postPassword);

        Map<String, Object> response = new HashMap<>();
        response.put("isValid", isValid);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-comment-password")
    public ResponseEntity<Map<String, Object>> verifyCommentPassword(@RequestBody Map<String, String> request)
    {
        String inputPassword = request.get("password");
        String commentNo = request.get("commentNo");

        Comment comment = commentRepository.findById(Integer.parseInt(commentNo));

        boolean isValid = passwordEncoder.matches(inputPassword, comment.getPassword());

        Map<String, Object> response = new HashMap<>();
        response.put("isValid", isValid);

        return ResponseEntity.ok(response);
    }

}
