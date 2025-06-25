package com.prepradar.backend.repository;


import com.prepradar.backend.model.QuizResult;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizResultRepository extends MongoRepository<QuizResult, String> {
    List<QuizResult> findByUserId(String userId);
}

