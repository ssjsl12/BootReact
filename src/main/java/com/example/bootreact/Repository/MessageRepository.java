package com.example.bootreact.Repository;

import com.example.bootreact.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByReceiver(String receiver);

}
