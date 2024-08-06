/**
 * Enum class that contains all the microservices paths.
 */
enum class Microservices(
    val path: String,
) {
    ALARM("alarm"),
    AUTH("auth"),
    DEVICE("device"),
    FRONTEND("frontend"),
    LOCATION("location"),
    LOG("log"),
    MONITORING("monitoring"),
    NOTIFICATION("notification"),
    RECOGNITION("recognition"),
    USER("user"),
    ;

    override fun toString(): String = path

    companion object {

        /**
         * Check if the tester is a microservice.
         */
        fun isAMicroservice(tester: String) = tester.lowercase() in values().map { it.path }
    }
}
