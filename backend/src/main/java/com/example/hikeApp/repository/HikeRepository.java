package com.example.hikeApp.repository;

import com.example.hikeApp.model.Hike;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface HikeRepository extends MongoRepository<Hike, String> {
    @Query(value = "{}", sort = "{ 'createdAt' : -1 }")
    Hike findTopByOrderByCreatedAtDesc();
}

