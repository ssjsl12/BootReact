package com.example.bootreact.Controller;


import com.example.bootreact.DTO.CommentDTO;
import com.example.bootreact.Service.CommentService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("{category}/{url}/{postId}/write")
    public @ResponseBody ResponseEntity addComment(@RequestBody CommentDTO commentDTO
            , @PathVariable("postId") int postId)
    {

        commentService.AddComment(commentDTO, postId);

        return ResponseEntity.ok().build();
    }


    @PostMapping("comment/delete/{no}")
    public @ResponseBody ResponseEntity deleteComment(@PathVariable("no") Long no)
    {

        commentService.deleteComment(no);

        return new ResponseEntity<String>("삭제 완료" , HttpStatus.OK);
    }


}
