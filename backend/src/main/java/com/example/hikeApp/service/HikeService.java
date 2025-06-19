package com.example.hikeApp.service;

import com.example.hikeApp.dto.HikeRequest;
import com.example.hikeApp.dto.HikeResponse;
import com.example.hikeApp.dto.HikeVoteRequest;
import com.example.hikeApp.model.Hike;
import com.example.hikeApp.model.HikeOption;
import com.example.hikeApp.repository.HikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HikeService {
    private final HikeRepository hikeRepository;

    public HikeResponse voteForHike(HikeVoteRequest request) {
        Hike hike = hikeRepository.findById(request.getVoteId())
            .orElseThrow(() -> new RuntimeException("Hike not found"));
    
   
        for (HikeOption option : hike.getOptions()) {
            if (option.getId().equals(request.getOptionId())) {
                option.setCount(option.getCount() + 1);
                break;
            }
        }
    
        hikeRepository.save(hike);
    
        List<HikeResponse.Option> optionResponses = new ArrayList<>();
        for (HikeOption option : hike.getOptions()) {
            optionResponses.add(HikeResponse.Option.builder()
                .id(option.getId())
                .label(option.getLabel())
                .count(option.getCount())
                .build());
        }

        return HikeResponse.builder()
            .id(hike.getId())
            .question(hike.getDescription())
            .numberOfVotes(hike.getVotes())
            .options(optionResponses)
            .build();

            }
    
    
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
        Hike hike = hikeRepository.findFirstByOrderByCreatedAtDesc();
        if (hike == null) throw new ResponseStatusException(
            HttpStatus.NOT_FOUND, "No hikes found"
        );
        return convertToResponse(hike);
    }

    private HikeResponse convertToResponse(Hike hike) {
        return new HikeResponse(
            hike.getId(),
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

