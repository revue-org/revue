#!/bin/bash

# Function to display usage information
usage() {
  echo "Usage: $0 --docker [--build] | --k8s"
  exit 1
}

# Check if no arguments were provided
if [ $# -eq 0 ]; then
  usage
fi

# Parse arguments
while [ $# -gt 0 ]; do
  case "$1" in
    --docker)
      if [ "$2" == "--build" ]; then
        ./scripts/compose-all.sh --up -d --build
      elif [ -z "$2" ]; then
        ./scripts/compose-all.sh --up -d
      else
        usage
      fi
      source .env
      docker run -d \
        --name revue-thing \
        --restart on-failure \
        --network revue-network \
        --env THING_ID=thing-1 \
        --env THING_PORT=6000 \
        --env THING_LOCATION=room-1 \
        --env KAFKA_HOST_1="$KAFKA_HOST_1"\
        --env KAFKA_PORT_1="$KAFKA_PORT_1" \
        --env KAFKA_HOST_2="$KAFKA_HOST_2" \
        --env KAFKA_PORT_2="$KAFKA_PORT_2" \
        --env MEDIA_SERVER_HOST="$MEDIA_SERVER_HOST" \
        --env MEDIA_SERVER_RTSP_PORT="$MEDIA_SERVER_RTSP_PORT" \
        -p 6000:6000 \
        letsdothisshared/revue-thing
      exit 0
      ;;
    --k8s)
      ./kubernetes/deploy.sh
      exit 0
      ;;
    *)
      usage
      ;;
  esac
done

usage
