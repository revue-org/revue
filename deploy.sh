# Function to display usage information
usage() {
  echo "Usage: $0 --docker [--build] | --k8s"
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
    if [ "$2" == "--build" ]; then
      ./scripts/compose-all.sh --up -d --build
    elif [ -z "$2" ]; then
      ./scripts/compose-all.sh --up -d
    else
      usage
    fi
    ;;
  --k8s)
    if [ -z "$2" ]; then
      if check_minikube; then
        echo "Minikube is already running."
      else
        echo "Starting Minikube..."
        minikube start
      fi
      helm repo add traefik https://traefik.github.io/charts
      helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
      helm repo add grafana https://grafana.github.io/helm-charts
      helm repo update
      helm install traefik traefik/traefik --values gateway/traefik-values.yml
      helm install prometheus prometheus-community/prometheus -f prometheus/prometheus-values.yml
      helm install grafana grafana/grafana -f prometheus/grafana-values.yml

      kubectl apply -f k8s
      sudo minikube tunnel
    else
      usage
    fi
    ;;
  *)
    usage
    ;;
esac
