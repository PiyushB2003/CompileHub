# Use the official OpenJDK image
FROM openjdk:latest

# Set working directory
WORKDIR /usr/src/app

# Copy the code from the host machine to the container
COPY . .

# Compile and run the Java program
CMD ["javac", "code.java", "&&", "java", "code"]
