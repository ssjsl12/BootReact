package com.example.bootreact.Service;

import com.example.bootreact.DTO.MessageDTO;
import com.example.bootreact.Entity.Message;
import com.example.bootreact.Entity.User;
import com.example.bootreact.Repository.MessageRepository;
import com.example.bootreact.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository; // 유저 정보 조회

    public void sendMessage(String sender, MessageDTO messageDTO) {
        // 보내는 사람 찾기

        // 받는 사람 찾기
        String receiverUser = messageDTO.getReceiver();

        // 쪽지 엔티티 생성
        Message message = Message.builder()
                .sender(sender)
                .messageTitle(messageDTO.getMessageTitle())
                .receiver(receiverUser)
                .messageContent(messageDTO.getMessageContent())
                .sendTime(LocalDateTime.now())
                .messageCheck(false) // 처음엔 읽지 않은 상태
                .build();

        // DB 저장
        messageRepository.save(message);
    }

    public List<MessageDTO> getLatestMessage(String receiver) {
        // 수신자에 해당하는 쪽지를 모두 조회 (최신 순으로 정렬)
        List<Message> messages = messageRepository.findByReceiver(receiver);

        // MessageDTO로 변환
        List<MessageDTO> messageDTOs = new ArrayList<>();

        for (Message message : messages) {
            MessageDTO dto = new MessageDTO();
            dto.setNo(message.getNo());
            dto.setMessageTitle(message.getMessageTitle());
            dto.setSenderNo(message.getSender());
            dto.setReceiver(message.getReceiver());
            dto.setMessageContent(message.getMessageContent());
            dto.setSendTime(message.getSendTime());
            dto.setMessageCheck(message.isMessageCheck());
            messageDTOs.add(dto);
        }

        return messageDTOs;
    }

    public void messageCheck(MessageDTO messageDto)
    {
        Message message = messageRepository.findByNo(messageDto.getNo());

        message.setMessageCheck(messageDto.isMessageCheck());

        messageRepository.save(message);
    }

    @Transactional
    public int deleteMessage(Long no)
    {
        return messageRepository.deleteByNo(no);
    }


}
