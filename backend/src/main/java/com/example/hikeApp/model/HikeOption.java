package com.example.hikeApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HikeOption {
    private String id;
    private String label;
    private Integer count;
}
