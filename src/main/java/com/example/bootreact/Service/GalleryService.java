package com.example.bootreact.Service;

import com.example.bootreact.Constant.GalleryType;
import com.example.bootreact.Entity.Gallery;
import com.example.bootreact.Entity.GalleryCategory;
import com.example.bootreact.Repository.GalleryCategoryRepository;
import com.example.bootreact.Repository.GalleryRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Log4j2
@Transactional
public class GalleryService {

    @Autowired
    private GalleryCategoryRepository galleryCategoryRepository;

    @Autowired
    private GalleryRepository galleryRepository;

    public List<GalleryCategory> getGalleryCategoriesByType(GalleryType galleryType) {
        // galleryType이 'gallery'인 카테고리 목록을 가져옵니다.
        return galleryCategoryRepository.findByGalleryType(galleryType);
    }

    public List<Gallery> getGalleriesByCategoryNo() {
        // 특정 카테고리 번호에 속한 갤러리 목록을 가져옵니다.
        return galleryRepository.findAll();
    }




}
