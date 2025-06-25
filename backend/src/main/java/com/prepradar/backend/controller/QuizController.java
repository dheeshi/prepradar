package com.prepradar.backend.controller;

import com.prepradar.backend.model.*;
import com.prepradar.backend.repository.QuestionRepository;
import com.prepradar.backend.repository.QuizResultRepository;
import com.prepradar.backend.service.CohereService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuestionRepository questionRepository;
    private final QuizResultRepository quizResultRepository;
    private final CohereService cohereService;

    @GetMapping("/start")
    public List<Question> startQuiz(
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String difficulty,
            @AuthenticationPrincipal User user
    ) {
        System.out.println("👉 User: " + (user != null ? user.getEmail() : "null"));
        System.out.println("🔎 Filters - Topic: " + topic + ", Difficulty: " + difficulty);

        List<Question> all = questionRepository.findAll();

        List<Question> filtered = all.stream()
                .filter(q -> topic == null || q.getTopic().equalsIgnoreCase(topic))
                .filter(q -> difficulty == null || q.getDifficulty().equalsIgnoreCase(difficulty))
                .collect(Collectors.toList());

        System.out.println("✅ Filtered Questions Count: " + filtered.size());

        Collections.shuffle(filtered);
        return filtered.subList(0, Math.min(5, filtered.size()));
    }


    @PostMapping("/submit")
    public QuizResult submitQuiz(@RequestBody List<QuizSubmission> submissions,
                                 @AuthenticationPrincipal User user) {

        int correct = 0;
        List<SubmissionFeedback> feedbacks = new ArrayList<>();

        for (QuizSubmission sub : submissions) {
            Optional<Question> qOpt = questionRepository.findById(sub.getQuestionId());
            if (qOpt.isEmpty()) continue;

            Question q = qOpt.get();
            boolean isCorrect = q.getCorrectAnswer().trim().equalsIgnoreCase(sub.getUserAnswer().trim());
            if (isCorrect) correct++;

            String feedback = isCorrect
                    ? "✅ Great job! That's correct."
                    : cohereService.getFeedback(q.getQuestionText(), sub.getUserAnswer(), q.getCorrectAnswer());

            feedbacks.add(new SubmissionFeedback(
                    q.getQuestionText(),
                    q.getCorrectAnswer(),
                    sub.getUserAnswer(),
                    isCorrect,
                    feedback
            ));
        }

        QuizResult result = QuizResult.builder()
                .userId(user.getId())
                .feedbackList(feedbacks)
                .totalCorrect(correct)
                .totalQuestions(submissions.size())
                .createdAt(LocalDateTime.now().toString())
                .build();

        return quizResultRepository.save(result);
    }
}
