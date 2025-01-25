package com.example.bootreact.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.validator.constraints.Length;

//회원가입 DTO
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JoinMemberDTO {

    @NotEmpty(message = "아이디는 필수 입력 값입니다")
    String id;

    @NotEmpty(message = "닉네임은 필수 입력 값입니다")
    String nickname;

    @NotEmpty(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요")
    String email;

    @NotEmpty(message = "패스워드는 필수 입력 값입니다.")
    @Length(min = 4, max = 16 , message = "최소 4자이상 16자 이하입니다")
    String password;

    @NotEmpty(message = "휴대폰번호는 필수 입력 값입니다.")
    String phone;
}
