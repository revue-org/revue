import { AnomalyService } from "@/application/services/AnomalyService";
import { AnomalyRepository } from "@/application/repositories/AnomalyRepository";
import { Anomaly } from "@/domain/core/Anomaly";
import { Intrusion } from "@/domain/core/Intrusion";
import { Outlier } from "@/domain/core/Outlier";
import { AnomalyId } from "@/domain/core/AnomalyId";


export class AnomalyServiceImpl implements AnomalyService {
  private repository: AnomalyRepository;

  constructor(repository: AnomalyRepository) {
    this.repository = repository;
  }

  async getAnomalies(): Promise<Anomaly[]> {
    return this.repository.getAnomalies();
  }

  async getIntrusions(): Promise<Intrusion[]> {
    return this.repository.getIntrusions();
  }

  async getOutliers(): Promise<Outlier[]> {
    return this.repository.getOutliers();
  }

  async getAnomalyById(anomalyId: AnomalyId): Promise<Anomaly> {
    return this.repository.getAnomalyById(anomalyId);
  }

  async createIntrusion(intrusion: Intrusion): Promise<void> {
    await this.repository.saveAnomaly(intrusion);
  }

  async createOutlier(outlier: Outlier): Promise<void> {
    await this.repository.saveAnomaly(outlier);
  }

  async updateIntrusion(intrusion: Intrusion): Promise<void> {
    await this.repository.updateAnomaly(intrusion);
  }

  async updateOutlier(outlier: Outlier): Promise<void> {
    await this.repository.updateAnomaly(outlier);
  }

  async deleteAnomaly(anomalyId: AnomalyId): Promise<void> {
    await this.repository.removeAnomaly(anomalyId);
  }
}
