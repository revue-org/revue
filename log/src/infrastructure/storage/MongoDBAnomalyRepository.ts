import mongoose from "mongoose";
import { Anomaly } from "../../domain/alarm-system/core/Anomaly.js";
import { Intrusion } from "../../domain/alarm-system/core/Intrusion.js";
import { AnomalyRepository } from "../../domain/alarm-system/repositories/AnomalyRepository.js";
import { AnomalyDBAdapter, AnomalyDBEntity } from "@/infrastructure/storage/models/AnomalyModel";
import { anomalySchema } from "@/infrastructure/storage/AnomalySchema";
import { Outlier } from "@/domain/core/Outlier";
import { AnomalyId } from "@/domain/core/AnomalyId";

export class MongoDBAnomalyRepository implements AnomalyRepository {
  private _model = mongoose.model<AnomalyDBEntity>("AnomalySchema", anomalySchema);

  async getOutliers(): Promise<Outlier[]> {
    const outliers = await this._model.find({
      "type": "outlier"
    }).lean();
    return outliers.map(outlier => AnomalyDBAdapter.asDomainEntity(outlier) as Outlier);
  }

  async getIntrusions(): Promise<Intrusion[]> {
    const intrusions = await this._model
      .find({
        "type": "intrusion"
      })
      .lean();
    return intrusions.map(intrusion => AnomalyDBAdapter.asDomainEntity(intrusion) as Intrusion);
  }

  async getAnomalyById(anomalyId: AnomalyId): Promise<Anomaly> {
    const anomaly = await this._model.findOne({
      id: anomalyId.id
    }).lean();
    if (!anomaly) {
      throw new Error("Anomaly not found");
    }
    return AnomalyDBAdapter.asDomainEntity(anomaly);
  }

  async getAnomalies(): Promise<Anomaly[]> {
    return this._model.find().lean().then((anomalies) => {
      return anomalies.map(anomaly => AnomalyDBAdapter.asDomainEntity(anomaly));
    });
  }

  async saveAnomaly(anomaly: Anomaly): Promise<void> {
    await this._model.create(AnomalyDBAdapter.asDBEntity(anomaly));
  }

  async updateAnomaly(anomaly: Anomaly): Promise<void> {
    await this._model.updateOne({
      id: anomaly.id.id
    }, AnomalyDBAdapter.asDBEntity(anomaly));
  }

  async removeAnomaly(anomalyId: AnomalyId): Promise<void> {
    await this._model.deleteOne({ id: anomalyId.id });
  }
}
