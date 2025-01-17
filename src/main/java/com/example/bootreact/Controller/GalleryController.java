package com.example.bootreact.Controller;

import com.example.bootreact.Constant.GalleryType;
import com.example.bootreact.Entity.Gallery;
import com.example.bootreact.Entity.GalleryCategory;
import com.example.bootreact.Service.GalleryService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RestController
@Log4j2
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @GetMapping("/categories/{type}")
    public List<GalleryCategory> getGalleryCategories(@PathVariable("type") String type) {


        List<GalleryCategory> list = galleryService.getGalleryCategoriesByType(GalleryType.gallery);

        list.forEach(item -> log.info(item.toString()));

        return list;
    }

    @GetMapping("/galleries")
    public List<Gallery> getGalleries() {

       List<Gallery> list = galleryService.getGalleriesByCategoryNo();
        list.forEach(item -> log.info(item.toString()));
        return list;
    }

    @GetMapping("/gallery/{galleryId}")
    public Gallery getGalleryById(@PathVariable int galleryId) {

        return null;
    }

}
