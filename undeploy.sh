# Function to display usage information
usage() {
  echo "Usage: $0 --docker | --k8s"
  exit 1
}

# Function to check if Minikube is running
check_minikube() {
  status=$(minikube status --format='{{.Host}}')

  if [ "$status" == "Running" ]; then
    return 0
  else
    return 1
  fi
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
      if check_minikube; then
        kubectl delete -f build/k8s
        helm uninstall traefik
        helm uninstall prometheus
        helm uninstall grafana
        minikube stop
        echo "Cluster stopped."
      else
        echo "Cluster already stopped."
      fi
    ;;
  *)
    usage
    ;;
esac
