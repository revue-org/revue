# syntax = docker/dockerfile:1.2

FROM python:3.10-alpine

WORKDIR /home/revue

COPY .env .env
COPY recognition recognition

WORKDIR /home/revue/recognition

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE ${RECOGNITION_PORT}

# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]
