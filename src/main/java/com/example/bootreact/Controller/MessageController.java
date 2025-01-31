package com.example.bootreact.Controller;

import com.example.bootreact.DTO.MessageDTO;
import com.example.bootreact.Service.MessageService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@Log4j2
public class MessageController {

    @Autowired
    private MessageService messageService;



    @PostMapping("/messages/send")
    public ResponseEntity<String> sendMessage(@RequestBody MessageDTO messageDTO, Principal principal) {
        String senderId = principal.getName(); // 현재 로그인한 사용자

        log.info(messageDTO);

        messageService.sendMessage(senderId, messageDTO);
        return ResponseEntity.ok("쪽지가 전송되었습니다.");
    }

    @GetMapping("/messages/get")
    public  List<MessageDTO> getMessage(Principal principal) {
        // 현재 로그인한 유저 ID 가져오기
        String username = principal.getName();

        List<MessageDTO> messageDTO = messageService.getLatestMessage(username);

        // 쪽지가 존재하면 반환, 없으면 빈 객체 반환
        return messageDTO;
    }

    @PostMapping("/meesage/check")
    public ResponseEntity checkMessage(@RequestBody MessageDTO messageDTO)
    {
        messageDTO.setMessageCheck(true);
        messageService.messageCheck(messageDTO);


        return ResponseEntity.ok("쪽지 읽기 성공");
    }


}
