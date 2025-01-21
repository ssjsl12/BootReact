package com.example.bootreact.Controller;

import com.example.bootreact.DTO.JoinMemberDTO;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
public class JoinController {

    @GetMapping("/join")
    public JoinMemberDTO join()
    {
        JoinMemberDTO dto = new JoinMemberDTO();

        return dto;
    }


}

