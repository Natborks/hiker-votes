package com.example.hikeApp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

@Data
public class HikeRequest {
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @Size(min = 2, message = "At least 2 options required")
    private List<OptionRequest> options;

    @Data
    public static class OptionRequest {
        @NotBlank(message = "Option label is required")
        private String label;
    }
}

