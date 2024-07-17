docker compose \
    --project-name revue \
    --project-directory . \
    -f gateway/docker-compose.yml \
    -f auth/docker-compose.yml \
    -f user/docker-compose.yml \
    -f kafka/docker-compose.yml \
    -f monitoring/docker-compose.yml \
    -f device/docker-compose.yml \
    -f alarm/docker-compose.yml \
    -f media-server/docker-compose.yml \
    -f frontend/docker-compose.yml \
    -f log/docker-compose.yml \
    -f location/docker-compose.yml \
    -f notification/docker-compose.yml \
    -f recognition/docker-compose.yml \
    -f prometheus/docker-compose.yml \
    "$@"
