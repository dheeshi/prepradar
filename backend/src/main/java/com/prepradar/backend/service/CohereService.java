package com.prepradar.backend.service;

import org.springframework.stereotype.Service;

@Service
public class CohereService {

    public String getFeedback(String question, String userAnswer, String correctAnswer) {

        if (userAnswer == null || userAnswer.isBlank()) {
            return "No answer was provided.";
        }

        if (correctAnswer == null || correctAnswer.isBlank()) {
            return "Feedback unavailable.";
        }

        if (userAnswer.trim().equalsIgnoreCase(correctAnswer.trim())) {
            return "Correct! Your answer matches the expected answer.";
        }

        return "Your answer differs from the expected answer. Review the concept and compare it with the correct answer.";
    }
}