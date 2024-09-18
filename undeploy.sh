# Function to display usage information
usage() {
  echo "Usage: $0 --docker | --k8s"
  exit 1
}

# Check if no arguments were provided
if [ $# -eq 0 ]; then
  usage
fi

# Determine the deployment type
case "$1" in
  --docker)
    ./scripts/compose-all.sh --down
    docker stop revue-thing
    docker rm revue-thing
    ;;
  --k8s)
    ./kubernetes/undeploy.sh
    ;;
  *)
    usage
    ;;
esac
