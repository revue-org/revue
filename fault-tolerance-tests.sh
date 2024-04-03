function tear_down() {
    ./undeploy.sh
    if [ "$1" -ne 0 ]; then
        echo "Tests of $2 failed. Exiting."
        exit "$1"
    else
        echo "Tests passed successfully."
    fi
}

function execute_test() {
    SERVICE=$1
    ./scripts/compose.sh run --rm --name "$SERVICE"-test revue-"$SERVICE" npm test
    EXIT_CODE=$?
    if [ $EXIT_CODE -ne 0 ]; then
        tear_down $EXIT_CODE "monitoring"
    fi
}

./deploy.sh
sleep 5

./scripts/compose.sh down revue-recognition

sleep 5

execute_test "monitoring"

tear_down 0

