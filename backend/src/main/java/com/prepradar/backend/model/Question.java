package com.prepradar.backend.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "questions")
public class Question {

    @Id
    private String id;

    private String questionText;
    private String topic;
    private String difficulty; // EASY, MEDIUM, HARD
    private String correctAnswer;
    private String[] options;
}

