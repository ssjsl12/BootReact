package com.example.bootreact.Controller;

import com.example.bootreact.DTO.LoginDTO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@Log4j2
public class LoginController {

    @GetMapping("/auth-check")
    public ResponseEntity checkAuthentication()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAuthenticated = authentication != null && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken);
        return ResponseEntity.ok(Map.of("authenticated", isAuthenticated));
    }

    @GetMapping("/loginForm")
    public LoginDTO loginForm()
    {

        LoginDTO loginDTO = new LoginDTO();

        return loginDTO;
    }


    @GetMapping(value = "/login/error")
    public String loginError(Model model)
    {
        model.addAttribute("loginErrorMsg" , "아이디 또는 비밀번호를 확인해주세요");
        return "/loginForm";
    }



}
