package com.prepradar.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class WebConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);

        // ✅ Add all frontend URLs (dev + prod)
      config.setAllowedOrigins(List.of(
    "http://localhost:5173", // local dev
    "https://prepradar.vercel.app", // ✅ MAIN production
    "https://prepradar-git-main-dheeshis-projects-9c56cbd9.vercel.app", // optional preview
    "https://prepradar-qksf29oy5-dheeshis-projects-9c56cbd9.vercel.app"  // optional preview
));


        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
