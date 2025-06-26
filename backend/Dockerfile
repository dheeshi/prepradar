# Use official Maven + Java image to build the project
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Use lightweight OpenJDK to run the app
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
