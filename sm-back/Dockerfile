# Etapa 1: build
FROM eclipse-temurin:17-jdk-jammy AS build

WORKDIR /app

# Copiar wrapper y config primero (mejor cache)
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x mvnw

COPY pom.xml .

# Descargar dependencias
RUN ./mvnw -B -q -DskipTests dependency:go-offline

# Copiar código
COPY src ./src

# Build
RUN ./mvnw clean package -DskipTests

# Etapa 2: runtime
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY --from=build /app/target/*.war app.war

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.war"]