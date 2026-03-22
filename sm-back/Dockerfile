# Etapa 1: Compilación
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Etapa 2: Ejecución
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
# CAMBIO CLAVE: Buscamos el .war en lugar del .jar
COPY --from=build /app/target/*.war app.war
EXPOSE 8080
# Ejecutamos el archivo .war (Spring Boot permite ejecutar .war como si fueran .jar)
ENTRYPOINT ["java","-jar","app.jar"]