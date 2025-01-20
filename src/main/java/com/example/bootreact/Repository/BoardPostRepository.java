package com.example.bootreact.Repository;

import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardPostRepository extends JpaRepository<BoardPost, Long> {


    @Query("SELECT bp FROM BoardPost bp WHERE bp.gallery.no = :galleryNo")
    List<BoardPost> findByGalleryNoLists(@Param("galleryNo") int galleryNo);

    BoardPost findById(long id);


}
