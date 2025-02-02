package com.example.bootreact.Controller;

import com.example.bootreact.DTO.JoinMemberDTO;
import com.example.bootreact.Entity.User;
import com.example.bootreact.Service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@Log4j2
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get/user")
    public JoinMemberDTO getMember(Principal principal)
    {
        User user = userService.findById(principal.getName());

        JoinMemberDTO joinMemberDTO = new JoinMemberDTO();
        joinMemberDTO.SetMember(user);

        return joinMemberDTO;
    }

    @PostMapping("/changepassword")
    public ResponseEntity<?> changePassword(@RequestParam("password") String password ,Principal principal) {


       boolean isValid = userService.changePassWord(principal.getName(), password);

       if(isValid)
       {
           return ResponseEntity.ok("비밀번호 변경 완료");
       }
       else {
           return ResponseEntity.badRequest().body("실패");
       }


    }


}
