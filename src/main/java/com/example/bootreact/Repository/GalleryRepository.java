package com.example.bootreact.Repository;

import com.example.bootreact.Constant.GalleryType;
import com.example.bootreact.Entity.Gallery;
import com.example.bootreact.Entity.GalleryCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {


    @Query("""
    SELECT g 
    FROM Gallery g 
    JOIN g.category c 
    WHERE c.galleryType = :galleryType
""")
    List<Gallery> findByCategoryType(@Param("galleryType") GalleryType galleryType);

    Gallery findByUrl(String url);
}
