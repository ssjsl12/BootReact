package com.example.bootreact.DTO;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//회원가입 DTO
@Getter
@Setter
@ToString
public class JoinMemberDTO {

    String id;
    String nickname;
    String email;
    String password;
    String phone;
}
