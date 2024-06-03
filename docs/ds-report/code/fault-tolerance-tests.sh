echo "Tearing up the system..."
./deploy.sh > /dev/null 2>&1
sleep 2

tear_down_services "log"
execute_test "monitoring" "log"

tear_down_services "auth"
execute_test "notification" "auth"

tear_down_services "notification"
execute_test "alarm" "notification"

tear_down_services "sensor-1" "sensor-2"
execute_test "monitoring" "sensor"

tear_down_system 0
