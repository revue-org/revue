# Function to display usage information
usage() {
  echo "Usage: $0 [--build]"
  exit 1
}

# if $1 exists and is not equal to "--build", display usage information
if [ $# -eq 0 ]; then
  ./scripts/compose-all.sh --up -d
elif [ "$1" != "--build" ]; then
  usage
else
  ./scripts/compose-all.sh --up -d --build
fi
