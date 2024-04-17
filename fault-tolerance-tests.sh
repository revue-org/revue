function tear_down_system() {
    ./undeploy.sh
    if [ "$1" -ne 0 ]; then
        echo "Tests of $2 failed. Exiting."
        exit "$1"
    else
        echo "Tests passed successfully."
    fi
}

function tear_down_services() {
    for service in "$@"
    do
        ./scripts/compose.sh down revue-"$service"
    done
    sleep 2
}

function tear_up_services() {
    for service in "$@"
    do
        ./scripts/compose.sh up -d revue-"$service"
    done
    sleep 2
}

function execute_test() {
    SERVICE=$1
    SERVICE_DOWN=$2
    echo "Running tests $SERVICE_DOWN"
    ./scripts/compose.sh run --rm --name "$SERVICE"-test revue-"$SERVICE" npm run test:tolerance:"$SERVICE_DOWN"
    EXIT_CODE=$?
    if [ $EXIT_CODE -ne 0 ]; then
        tear_down_system $EXIT_CODE "monitoring"
    fi
    sleep 2
}

./deploy.sh
sleep 2

#tear_down_services "log"
#execute_test "monitoring" "log"

tear_down_services "auth"
execute_test "notification" "auth"

#tear_down_services "sensor-1" "sensor-2"
#execute_test "monitoring" "sensor"

tear_down_system 0
