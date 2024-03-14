# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy all files from your current directory to the container
COPY . .

# Install any necessary dependencies (if required)
# RUN pip install -r requirements.txt

# Expose port 8000 to the outside world
EXPOSE 8000

# Define the command to start the HTTP server
CMD ["python", "-m", "http.server", "8000"]
