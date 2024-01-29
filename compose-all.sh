#!/bin/bash

# Function to display usage information
usage() {
  echo "Usage: $0 (--up | --down)"
  exit 1
}

# Check if at least two argument is provided
if [ "$#" -lt 1 ]; then
  usage
fi

command=''
# Process options
while [[ $# -gt 0 ]]; do
  case "$1" in
    --up|--down)
      command="$1"
      shift
      ;;
#    *)
#      echo "$1"
#      services+=("$1")
#      shift
#      ;;
  esac
done

# Check if --command option is provided
if [ -z "$command" ]; then
  usage
fi

compose_files=("-fauth/docker-compose.yml"  "-fkafka/docker-compose.yml" "-fmonitoring/docker-compose.yml" "-falarm/docker-compose.yml"
"-ffrontend/docker-compose.yml" "-fcamera/docker-compose.yml")


if [ "$command" == "--down" ]; then
  docker compose --project-name revue --project-directory . "${compose_files[@]}" "${command:2}" -v
else
  docker compose --project-name revue --project-directory . "${compose_files[@]}" "${command:2}" -d --build
fi
