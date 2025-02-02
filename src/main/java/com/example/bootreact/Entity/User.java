package com.example.bootreact.Entity;

import com.example.bootreact.Constant.Role;
import com.example.bootreact.DTO.JoinMemberDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.crypto.password.PasswordEncoder;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "user_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;
    @Column(unique = true)
    private String id;

    private String password;

    @Column(unique = true)
    private String userEmail;

    private String nickname;

    @Column(unique = true)
    private String phone;

    private String gender;
    private String birth;

    @Enumerated(EnumType.STRING)
    private Role role; // ROLE_USER, ROLE_ADMIN

    public static User createMember(JoinMemberDTO dto, PasswordEncoder passwordEncoder)
    {
        User member = new User();
        member.setId(dto.getId());
        member.setNickname(dto.getNickname());
        member.setUserEmail(dto.getEmail());
        member.setPhone(dto.getPhone());
        member.setPassword(passwordEncoder.encode(dto.getPassword()));
        member.setRole(Role.USER);
        member.setGender(dto.getGender());
        member.setBirth(dto.getBirth());
        return member;
    }
}