package com.example.bootreact.config;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@Log4j2
public class SecurityConfig {



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        log.info("-------------------------Configuring SecurityFilterChain----------------------------");
        http
        .csrf(csrf -> csrf.disable()) // 필요에 따라 CSRF 비활성화
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/**" , "/api/**"
                        ).permitAll() // 허용된 경로
                        .requestMatchers("/AdminPage", "/Admin/**").hasRole("ADMIN") // 관리자 권한 필요
                        .anyRequest().authenticated() // 기타 요청은 인증 필요
                )
                .formLogin(config -> config
                        .loginPage("/login")
                        .defaultSuccessUrl("http://localhost:3000")
                        .usernameParameter("id")
                        .failureUrl("/login/error")
                        .failureHandler((request, response, exception) ->
                        { // 실패 핸들러 추가
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 상태 코드 설정
                            response.setContentType("application/json;charset=UTF-8"); // 응답 형식 설정
                            response.getWriter().write("{\"success\": false, \"message\": \"로그인 실패: 아이디 또는 비밀번호를 확인하세요.\"}");
                        })
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .logoutSuccessUrl("http://localhost:3000")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                )
                .securityContext(security -> security
                        .securityContextRepository(securityContextRepository()) // SecurityContext와 세션 동기화
                );

        http.addFilterBefore(corsFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        // SecurityContext를 HttpSession에 저장하여 동기화ron
        return new HttpSessionSecurityContextRepository();
    }

   @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");// 리액트 서버
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }


}
