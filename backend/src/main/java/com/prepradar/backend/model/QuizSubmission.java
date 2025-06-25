package com.prepradar.backend.model;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizSubmission {
    private String questionId;
    private String userAnswer;
}
