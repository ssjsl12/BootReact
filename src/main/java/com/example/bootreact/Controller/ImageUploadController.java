package com.example.bootreact.Controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
@Log4j2
public class ImageUploadController {

    // 이미지 저장할 디렉토리
    private static final String UPLOAD_DIR = "uploads/";

    public ImageUploadController() {
        // 업로드 디렉토리가 없다면 생성
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }

    // 이미지 업로드 API
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("파일이 비어있습니다.", HttpStatus.BAD_REQUEST);
        }

        try {
            // 파일 이름 설정
            String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);

            // 파일 저장
            Files.copy(file.getInputStream(), filePath);

            // 저장된 파일 URL (클라이언트에서 접근할 수 있도록)
            String fileUrl = "/uploads/" + fileName;

            // 성공적인 업로드 후 URL 반환
            return new ResponseEntity<>(fileUrl, HttpStatus.OK);

        } catch (IOException e) {
            return new ResponseEntity<>("파일 저장 중 오류 발생", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/uploads/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable("fileName") String fileName) {

        try {
            // 파일 경로 설정
            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
            Resource resource = new PathResource(filePath);

            // 파일이 존재하고 읽을 수 있으면 반환
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)  // 이미지 파일의 경우 Content-Type 설정
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }






}