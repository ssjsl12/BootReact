package com.example.bootreact.Repository;

import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Scrap;
import com.example.bootreact.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {


    List<Scrap> getScrapByUser(User user);

    void deleteByPostId(int postId);
}
