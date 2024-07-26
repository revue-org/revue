#!/bin/bash

if [ ! -d "k8s" ]; then
  echo "Creating k8s directory"
  mkdir k8s
else
  rm -f "k8s"/*
fi

docker compose \
    --project-name revue \
    --project-directory . \
    -f alarm/docker-compose.yml \
    -f auth/docker-compose.yml \
    -f device/docker-compose.yml \
    -f frontend/docker-compose.yml \
    -f kafka/docker-compose.yml \
    -f location/docker-compose.yml \
    -f log/docker-compose.yml \
    -f media-server/docker-compose.yml \
    -f monitoring/docker-compose.yml \
    -f notification/docker-compose.yml \
    -f recognition/docker-compose.yml \
    -f user/docker-compose.yml \
    config > all-docker-compose.yml

kompose convert \
  --with-kompose-annotation=false \
  --volumes persistentVolumeClaim \
  -f all-docker-compose.yml \
  -o k8s

rm all-docker-compose.yml
