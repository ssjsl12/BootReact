package com.example.bootreact.Service;

import com.example.bootreact.Entity.User;
import com.example.bootreact.Repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Log4j2
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        log.info("---------------loadUserByUsername--------------");

        System.out.println("넘어온 이메일: " + email);
        System.out.println("loadUserByUsername 실행");

        // 사용자 조회, 없으면 예외 발생
        User user = userRepository.findByUserEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // 사용자가 있다면 UserDetails 객체 생성
        return new org.springframework.security.core.userdetails.User(
                user.getUserEmail(),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRole())));
    }

}