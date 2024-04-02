./deploy.sh
sleep 5

./scripts/compose.sh down recognition

sleep 5

./scripts/compose.sh run --rm monitoring npm test
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
    echo "Tests of monitoring failed. Exiting."
    exit $EXIT_CODE
fi

echo "Tests passed successfully."
