package com.example.hikeApp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class HikeResponse {
    private String id;
    private String question;
    private Integer numberOfVotes;
    private List<Option> options;

    @Data
    @AllArgsConstructor
    public static class Option {
        private String id;
        private String label;
        private Integer count;
    }
}

