# syntax = docker/dockerfile:1.2

FROM python:3.10

WORKDIR /home/revue

COPY .env .env
COPY recognition recognition

WORKDIR /home/revue/recognition

# Install yolov3 neural network weights
# RUN wget -N -P app/resources/yolov3/ -c "https://pjreddie.com/media/files/yolov3.weights" --header "Referer: pjreddie.com"

# removes the configurations to delete cached files after a successful install
RUN rm -f /etc/apt/apt.conf.d/docker-clean; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache

# Install curl and nodejs 20 (LTS)
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && apt-get install -y libglib2.0-0 libxext6 ffmpeg libsm6

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE $RECOGNITION_PORT

CMD ["sh", "-c", "waitress-serve --port $FLASK_RUN_PORT --call app.main:create_app"]
