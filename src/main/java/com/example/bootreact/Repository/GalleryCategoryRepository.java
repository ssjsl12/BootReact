package com.example.bootreact.Repository;

import com.example.bootreact.Constant.GalleryType;
import com.example.bootreact.Entity.GalleryCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GalleryCategoryRepository extends JpaRepository<GalleryCategory, Integer> {


    List<GalleryCategory> findByGalleryType(GalleryType galleryType);



}