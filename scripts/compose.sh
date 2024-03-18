docker compose \
    --project-name revue \
    --project-directory . \
    -f auth/docker-compose.yml \
    -f kafka/docker-compose.yml \
    -f monitoring/docker-compose.yml \
    -f alarm/docker-compose.yml \
    -f media-server/docker-compose.yml \
    -f frontend/docker-compose.yml \
    -f log/docker-compose.yml \
    -f notification/docker-compose.yml \
    -f camera/docker-compose.yml \
    -f sensor/docker-compose.yml \
    -f recognition/docker-compose.yml \
    "$@"
