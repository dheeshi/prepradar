package com.prepradar.backend.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "quiz_results")
public class QuizResult {
    @Id
    private String id;

    private String userId;
    private List<SubmissionFeedback> feedbackList;
    private int totalCorrect;
    private int totalQuestions;
    private String createdAt;
}
