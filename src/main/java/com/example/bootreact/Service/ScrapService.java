package com.example.bootreact.Service;

import com.example.bootreact.DTO.ScrapDTO;
import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Scrap;
import com.example.bootreact.Entity.User;
import com.example.bootreact.Repository.ScrapRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class ScrapService {

    @Autowired
    ScrapRepository scrapRepository;

    public void scrapSave(BoardPost post , User user)
    {
        Scrap scrap = new Scrap();
        scrap.setPost(post);
        scrap.setUser(user);

        scrapRepository.save(scrap);
    }

    public List<Scrap> getPost(User user)
    {
        List<Scrap> scrap = scrapRepository.getScrapByUser(user);

        return scrap;
    }

    @Transactional
    public void deletePost(int no)
    {
        log.info(no);

        scrapRepository.deleteByPostId(no);
    }


}
