package com.example.hikeApp.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class HikeVoteRequest {
     @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Date is required")
    private String date;

    @NotBlank(message = "VoteOption is required")
    private String optionId;

    @NotBlank(message = "Vote id is required")
    private String voteId;

}
