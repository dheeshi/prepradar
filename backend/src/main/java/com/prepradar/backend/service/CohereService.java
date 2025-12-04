package com.prepradar.backend.service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;

@Service
public class CohereService {

@Value("${COHERE_API_KEY}")
private String apiKey;


    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public String getFeedback(String question, String userAnswer, String correctAnswer) {
        String userPrompt = String.format("""
                You are a helpful AI assistant.
                A user answered a Java interview question.

                Question: %s
                User Answer: %s
                Correct Answer: %s

                Give a short explanation (1-2 lines) why the answer is correct or incorrect.
                """, question, userAnswer, correctAnswer);

        // ✅ New Cohere Chat API format
        ObjectNode message = mapper.createObjectNode();
        message.put("role", "user");
        message.put("content", userPrompt);

        ObjectNode body = mapper.createObjectNode();
        body.put("model", "command-r");  // new chat-compatible model
        body.putArray("messages").add(message);
        body.put("temperature", 0.7);

        Request request = new Request.Builder()
                .url("https://api.cohere.ai/v1/chat") // ✅ new endpoint
                .post(RequestBody.create(
                        body.toString(),
                        MediaType.get("application/json")
                ))
                .addHeader("Authorization", "Bearer " + apiKey)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.err.println("❌ Cohere Chat API Error: " + response.code());
                System.err.println(response.body().string());
                return "⚠️ AI feedback unavailable.";
            }

            String responseBody = response.body().string();
            JsonNode root = mapper.readTree(responseBody);

            // ✅ Extract text safely
            return root.path("message").path("content").get(0).path("text").asText().trim();

        } catch (IOException e) {
            e.printStackTrace();
            return "⚠️ Error contacting AI.";
        }
    }
}
