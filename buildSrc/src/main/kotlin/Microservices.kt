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
        fun isAMicroservice(tester: String) = tester.lowercase() in values().map { it.path }
        val String.isAMicroservice get() = isAMicroservice(this)
    }
}
