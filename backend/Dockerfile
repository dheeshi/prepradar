# Use JDK base image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy jar file to container
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
