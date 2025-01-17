package com.example.bootreact.Repository;

import com.example.bootreact.Entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    List<Gallery> findByCategory_No(int categoryNo); // 특정 카테고리 번호에 속한 갤러리들 조회

}
