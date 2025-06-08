package com.example.hikeApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "hikes")
public class Hike {
    @Id
    private String id;
    private String name;
    private String description;
    private List<HikeOption> options;
    private Integer votes;
    private Date createdAt;
}

