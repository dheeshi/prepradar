package com.prepradar.backend.repository;

import com.prepradar.backend.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepository extends MongoRepository<Question, String> {
}
