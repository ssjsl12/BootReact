package com.example.bootreact.DTO;

import lombok.Getter;
import lombok.Setter;

//로그인 DTO
@Getter
@Setter
public class LoginDTO {

    String id;
    String nickname;
    String password;
    String email;
    String phone;

}
