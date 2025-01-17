package com.example.bootreact.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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

    private String userName;
    private String password;

    @Column(unique = true)
    private String userEmail;

    private String role; // ROLE_USER, ROLE_ADMIN


}