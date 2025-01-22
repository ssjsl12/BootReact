package com.example.bootreact.Service;

import com.example.bootreact.DTO.JoinMemberDTO;
import com.example.bootreact.Entity.User;
import com.example.bootreact.Repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Log4j2
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void JoinUser(JoinMemberDTO dto)
    {
        User user = User.createMember(dto ,passwordEncoder);

        userRepository.save(user);
    }

    //로그인 알아서 처리
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        // 사용자 조회, 없으면 예외 발생
        User user = userRepository.findById(id);
        if (user == null) {

            throw new UsernameNotFoundException(id);
        }

        // 사용자가 있다면 UserDetails 객체 생성
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getId())
                .password(user.getPassword())
                .roles(user.getRole().toString())
                .build();
    }


}
