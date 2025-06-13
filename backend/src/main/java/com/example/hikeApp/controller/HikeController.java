package com.example.hikeApp.controller;

import com.example.hikeApp.dto.HikeRequest;
import com.example.hikeApp.dto.HikeResponse;
import com.example.hikeApp.service.HikeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hikes")
@RequiredArgsConstructor
public class HikeController {
    private final HikeService hikeService;

    @PostMapping
    public ResponseEntity<HikeResponse> createHike(
        @Valid @RequestBody HikeRequest request
    ) {
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(hikeService.createHike(request));
    }

    @GetMapping("/latest")
    public ResponseEntity<HikeResponse> getLatestHike() {
        return ResponseEntity.ok(hikeService.getLatestHike());
    }
}

