package com.example.bootreact.Controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
public class LoginController {

    @GetMapping(value = "/login")
    public String login(){


        log.info("login");

        return "login";
    }


}
