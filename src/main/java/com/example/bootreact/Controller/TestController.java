package com.example.bootreact.Controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
public class TestController {

    @GetMapping("/test")
    public String home() {

        log.info("test");

        return "Hello World";
    }

}
