package com.example.bootreact.Controller;

import com.example.bootreact.DTO.JoinMemberDTO;
import com.example.bootreact.Service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
public class JoinController {

    @Autowired
    private UserService userService;

    @GetMapping("/join")
    public JoinMemberDTO join()
    {
        JoinMemberDTO dto = new JoinMemberDTO();

        return dto;
    }

    @PostMapping("/join")
    public @ResponseBody ResponseEntity joinMember(@RequestBody JoinMemberDTO dto)
    {
        userService.JoinUser(dto);

        return ResponseEntity.ok().build();
    }

}

