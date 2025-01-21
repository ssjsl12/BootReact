package com.example.bootreact.Repository;

import com.example.bootreact.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUserEmail(String userEmail);

    User findById(String userId);
}