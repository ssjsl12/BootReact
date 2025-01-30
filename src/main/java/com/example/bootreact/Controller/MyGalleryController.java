package com.example.bootreact.Controller;

import com.example.bootreact.DTO.ScrapDTO;
import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Scrap;
import com.example.bootreact.Entity.User;
import com.example.bootreact.Service.ScrapService;
import com.example.bootreact.Service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Log4j2
public class MyGalleryController {


    @Autowired
    private ScrapService scrapService;

    @Autowired
    private UserService userService;

    //게시글 스크랩

    @GetMapping("/scrap/post")
    public List<ScrapDTO> scrapPost(Principal principal)
    {
        User user = userService.findById(principal.getName());

       List<Scrap> scraps = scrapService.getPost(user);


        return scraps.stream()
                .map(ScrapDTO::new)
                .collect(Collectors.toList());
    }



}
