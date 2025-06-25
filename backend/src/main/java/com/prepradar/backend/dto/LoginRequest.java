package com.prepradar.backend.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
    
    
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}

