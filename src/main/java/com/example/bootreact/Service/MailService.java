package com.example.bootreact.Service;

import com.example.bootreact.DTO.MailDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;
    private static final String title = "인증번호 안내 이메일입니다.";
    private static final String message = "안녕하세요. 인증번호 메일입니다. "
            + "\n" + "회원님의 인증번호는 아래와 같습니다." + "\n";

    //보내는사람
    @Value("${spring.mail.username}")
    private String from;

    public String getTmpPassword() {
        char[] charSet = new char[]{ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        String newPassword = "";

        for (int i = 0; i < 10; i++) {
            int idx = (int) (charSet.length * Math.random());
            newPassword += charSet[idx];
        }

        return newPassword;
    }


    //인증번호
    public MailDTO createMail(String tmpPassword, String to) {
        MailDTO mailDto = new MailDTO(from, to, title, message + tmpPassword);
        return mailDto;
    }


    public void sendMail(MailDTO mailDto) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(mailDto.getTo());
        mailMessage.setSubject(mailDto.getTitle());
        mailMessage.setText(mailDto.getMessage());
        mailMessage.setFrom(mailDto.getFrom());
        mailMessage.setReplyTo(mailDto.getFrom());

        mailSender.send(mailMessage);
    }

}
