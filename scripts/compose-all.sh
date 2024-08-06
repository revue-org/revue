#!/bin/bash

# Function to display usage information
usage() {
  echo "Usage: $0 (--up [--build] [-d] | --down [-v])"
  exit 1
}

# Check if at least two argument is provided
if [ "$#" -lt 1 ]; then
  usage
fi

command=''
volume=''
detached=''
build=''
# Process options
while [[ $# -gt 0 ]]; do
  case "$1" in
    --up|--down)
      command="$1"
      shift
      ;;
    -v)
      volume="$1"
      shift
      ;;
    -d)
      detached="$1"
      shift
      ;;
    --build)
      build="$1"
      shift
      ;;
    *)
      usage
      ;;
  esac
done

# Check if --command option is provided
if [ -z "$command" ]; then
  usage
fi

compose_files=("-falarm/docker-compose.yml" "-fauth/docker-compose.yml" "-fdevice/docker-compose.yml"
"-ffrontend/docker-compose.yml" "-fgateway/docker-compose.yml" "-fkafka/docker-compose.yml" "-flocation/docker-compose.yml"
"-flog/docker-compose.yml" "-fmedia-server/docker-compose.yml" "-fmonitoring/docker-compose.yml" "-fnotification/docker-compose.yml"
"-frecognition/docker-compose.yml" "-fuser/docker-compose.yml")

if [ "$command" == "--down" ]; then
  eval docker compose --project-directory . "${compose_files[@]}" "${command:2}" "${volume}"
  eval docker network rm revue-network
else
  eval docker network create --driver=bridge --subnet=172.25.0.0/16 revue-network
  eval docker compose --project-name revue --project-directory . "${compose_files[@]}" "${command:2}" "${detached}" "${build}"
fi
