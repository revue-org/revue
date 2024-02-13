#!/bin/bash

# Function to display usage information
usage() {
  echo "Usage: $0 (--up | --down) <service1> [<service2> ...]"
  exit 1
}

# Check if at least two argument is provided
if [ "$#" -lt 2 ]; then
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
    *)
      echo "$1"
      services+=("$1")
      shift
      ;;
  esac
done

# Check if --command option is provided
if [ -z "$command" ]; then
  usage
fi

# Check if services are provided
if [ ${#services[@]} -eq 0 ]; then
  echo "Error: No services specified."
  usage
fi

compose_files=()
for service in "${services[@]}"; do
  compose_files+=("-f$service/docker-compose.yml")
done

if [ "$command" == "--down" ]; then
  eval docker compose --project-name revue --project-directory . "${compose_files[@]}" "${command:2}" -v
else
  eval docker compose --project-name revue --project-directory . "${compose_files[@]}" "${command:2}" -d --build
fi
