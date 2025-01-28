package com.example.bootreact.Repository;

import com.example.bootreact.Entity.BoardPost;
import com.example.bootreact.Entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardPostRepository extends JpaRepository<BoardPost, Long> {


    @Query("SELECT bp FROM BoardPost bp WHERE bp.gallery.no = :galleryNo")
    List<BoardPost> findByGalleryNoLists(@Param("galleryNo") int galleryNo);

    BoardPost findById(long id);


    @Query("SELECT bp FROM BoardPost bp WHERE bp.gallery.no = :galleryNo ORDER BY bp.createdAt DESC")
    List<BoardPost> findByGalleryNoOrderByCreatedAtDesc(@Param("galleryNo") int galleryNo);

    @Query("SELECT bp FROM BoardPost bp WHERE bp.gallery.no = :galleryNo ORDER BY bp.views DESC ")
    List<BoardPost> findByGalleryNoOrderByViewsDesc(@Param("galleryNo") int galleryNo);

    @Query("SELECT bp FROM BoardPost bp WHERE bp.gallery.no = :galleryNo ORDER BY bp.recommend DESC ")
    List<BoardPost> findByGalleryNoOrderByRecommendDesc(@Param("galleryNo") int galleryNo);

    @Modifying
    @Query("UPDATE BoardPost bp SET bp.recommend = bp.recommend + 1 WHERE bp.id = :no")
    void incrementRecommendCount(@Param("no") Long no);

    @Modifying
    @Query("UPDATE BoardPost bp SET bp.notrecommend = bp.notrecommend + 1 WHERE bp.id = :no")
    void decrementRecommendCount(@Param("no") Long no);

}
