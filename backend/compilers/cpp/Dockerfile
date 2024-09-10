# Use the official GCC image
FROM gcc:latest

# Set working directory
WORKDIR /usr/src/app

# Copy the code from the host machine to the container
COPY . .

# Compile and run the C++ program
CMD ["g++", "code.cpp", "-o", "code", "&&", "./code"]
