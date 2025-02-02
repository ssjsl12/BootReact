package com.example.bootreact.Controller;

import com.example.bootreact.DTO.JoinMemberDTO;
import com.example.bootreact.Service.UserService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.Map;

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
    public ResponseEntity<?> joinMember(@Valid @RequestBody JoinMemberDTO dto, BindingResult bindingResult) {

        // 입력값 검증 실패 처리
        if (bindingResult.hasErrors()) {
            // 첫 번째 에러 메시지를 반환
            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
            return ResponseEntity.badRequest().body(Map.of("message", errorMessage));
        }

        if(userService.isEmailDuplicate(dto.getEmail()))
        {
            return ResponseEntity.badRequest().body(Map.of("message", "이미 인증이 된 이메일 입니다."));
        }

        // 회원가입 처리 로직
        userService.JoinUser(dto);

        // 성공 메시지 반환
        return ResponseEntity.ok().body(Map.of("message", "회원가입에 성공하였습니다."));
    }

    //아이디 비번 체크
    @GetMapping("/check-duplicate")
    public ResponseEntity<?> checkDuplicate(@RequestParam String type, @RequestParam String value) {
        boolean isDuplicate;

        if ("id".equals(type)) {
            isDuplicate = userService.isIdDuplicate(value);
        } else if ("nickname".equals(type)) {
            isDuplicate = userService.isNicknameDuplicate(value);
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "유효하지 않은 타입입니다."));
        }

        return ResponseEntity.ok(Map.of("isDuplicate", isDuplicate));
    }


}

