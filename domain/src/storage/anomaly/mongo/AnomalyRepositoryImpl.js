import { exceedingModel } from "../../security-rule/mongo/schemas/ExceedingRule";
import { intrusionModel } from "../../security-rule/mongo/schemas/IntrusionRule";
class AnomalyRepositoryImpl {
    getAnomalies() {
        return this.getExceedings() && this.getIntrusions();
    }
    getExceedings() {
        return exceedingModel.find();
    }
    getIntrusions() {
        return intrusionModel.find();
    }
    insertAnomaly(anomaly) {
    }
    deleteAnomaly(anomalyId) {
    }
}
