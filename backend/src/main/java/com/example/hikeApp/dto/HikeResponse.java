package com.example.hikeApp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
@Getter
public class HikeResponse {
    private String id;
    private String question;
    private Integer numberOfVotes;
    private List<Option> options;

    @Data
    @AllArgsConstructor
    @Builder
    @Getter
    public static class Option {
        private String id;
        private String label;
        private Integer count;
    }
}

