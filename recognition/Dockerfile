# syntax = docker/dockerfile:1.2

FROM python:3.10-slim

WORKDIR /home/revue

COPY .env .env
COPY recognition recognition

WORKDIR /home/revue/recognition

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE $RECOGNITION_PORT

# Run __init__.py when the container launches
CMD ["sh", "-c", "waitress-serve --port $FLASK_RUN_PORT --call app:create_app"]
