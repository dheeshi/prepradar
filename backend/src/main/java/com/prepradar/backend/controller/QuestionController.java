package com.prepradar.backend.controller;


import com.prepradar.backend.model.Question;
import com.prepradar.backend.repository.QuestionRepository;
import com.prepradar.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionRepository questionRepository;

    // ADMIN: Add a question
    @PostMapping("/add")
    public String addQuestion(@RequestBody Question question, @AuthenticationPrincipal User user) {
        System.out.println("USER ROLE: " + user.getRole());
        if (!user.getRole().equals("ADMIN")) {
            System.out.println("Blocked: not admin");
            return "Access Denied";
        }

        Question saved = questionRepository.save(question);
        System.out.println("Saved question: " + saved);

        // 🔽 This is the line from Step 2 (Prints all questions from DB)
        List<Question> all = questionRepository.findAll();
        System.out.println("Questions in DB: " + all.size());

        return "Question added!";
    }



    // ADMIN: View all questions
    @GetMapping("/all")
    public List<Question> getAllQuestions(@AuthenticationPrincipal User user) {
        if (!user.getRole().equals("ADMIN")) return List.of();
        return questionRepository.findAll();
    }

    // ADMIN: Delete a question
    @DeleteMapping("/{id}")
    public String deleteQuestion(@PathVariable String id,
                                 @AuthenticationPrincipal User user) {
        if (!user.getRole().equals("ADMIN")) return "Access Denied";
        questionRepository.deleteById(id);
        return "Deleted successfully!";
    }

    // ADMIN: Update a question
    @PutMapping("/{id}")
    public String updateQuestion(@PathVariable String id,
                                 @RequestBody Question updatedQuestion,
                                 @AuthenticationPrincipal User user) {
        if (!user.getRole().equals("ADMIN")) return "Access Denied";

        Question existing = questionRepository.findById(id).orElse(null);
        if (existing == null) return "Not found";

        existing.setQuestionText(updatedQuestion.getQuestionText());
        existing.setTopic(updatedQuestion.getTopic());
        existing.setDifficulty(updatedQuestion.getDifficulty());
        existing.setCorrectAnswer(updatedQuestion.getCorrectAnswer());
        existing.setOptions(updatedQuestion.getOptions());

        questionRepository.save(existing);
        return "Updated!";
    }
}

