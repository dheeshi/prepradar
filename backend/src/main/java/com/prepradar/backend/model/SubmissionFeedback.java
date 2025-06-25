package com.prepradar.backend.model;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionFeedback {
    private String question;
    private String correctAnswer;
    private String userAnswer;
    private boolean isCorrect;
    private String aiFeedback;  
}
