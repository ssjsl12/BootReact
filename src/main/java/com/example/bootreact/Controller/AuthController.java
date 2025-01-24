package com.example.bootreact.Controller;


import com.example.bootreact.DTO.MailDTO;
import com.example.bootreact.Service.MailService;
import com.example.bootreact.Service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Log4j2
public class AuthController {

    @Autowired
    private MailService mailService;

    //이메일 인증
    @PostMapping("auth/email")
    public @ResponseBody ResponseEntity emailAuth(@RequestBody Map<String, String> data) {
        String email = data.get("email");

        String authMail = mailService.getTmpPassword();

        MailDTO mail = mailService.createMail(authMail, email);

        mailService.sendMail(mail);


        return ResponseEntity.ok().body(authMail);
    }




}
