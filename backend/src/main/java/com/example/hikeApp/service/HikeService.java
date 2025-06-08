package com.example.hikeApp.service;

import com.example.hikeApp.dto.HikeRequest;
import com.example.hikeApp.dto.HikeResponse;
import com.example.hikeApp.model.Hike;
import com.example.hikeApp.model.HikeOption;
import com.example.hikeApp.repository.HikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HikeService {
    private final HikeRepository hikeRepository;
    
    public HikeResponse createHike(HikeRequest request) {
        Hike hike = new Hike();
        hike.setName(request.getName());
        hike.setDescription(request.getDescription());
        hike.setOptions(request.getOptions().stream()
            .map(opt -> new HikeOption(
                UUID.randomUUID().toString(),
                opt.getLabel(),
                0
            ))
            .toList());
        hike.setVotes(0);
        hike.setCreatedAt(new Date());
        
        Hike savedHike = hikeRepository.save(hike);
        return convertToResponse(savedHike);
    }

    public HikeResponse getLatestHike() {
        Hike hike = hikeRepository.findTopByOrderByCreatedAtDesc();
        if (hike == null) throw new ResponseStatusException(
            HttpStatus.NOT_FOUND, "No hikes found"
        );
        return convertToResponse(hike);
    }

    private HikeResponse convertToResponse(Hike hike) {
        return new HikeResponse(
            hike.getName() + " - " + hike.getDescription(),
            hike.getVotes(),
            hike.getOptions().stream()
                .map(opt -> new HikeResponse.Option(
                    opt.getId(),
                    opt.getLabel(),
                    opt.getCount()
                ))
                .toList()
        );
    }
}

