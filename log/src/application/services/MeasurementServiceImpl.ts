import { MeasurementService } from "@/application/services/MeasurementService";
import { MeasurementRepository } from "@/application/repositories/MeasurementRepository";

export class MeasurementServiceImpl implements MeasurementService {
  private repository: MeasurementRepository;

  constructor(repository: MeasurementRepository) {
    this.repository = repository;
  }

  async getMeasurements(): Promise<Measurement[]> {
    return this.repository.getMeasurements();
  }

  async getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]> {
    return this.repository.getMeasurementsBySourceDeviceId(deviceId, quantity);
  }

  async createMeasurement(measurement: Measurement): Promise<void> {
    await this.repository.saveMeasurement(measurement);
  }

  async updateMeasurement(measurementId: Measurement): Promise<void> {
    await this.repository.updateMeasurement(measurementId);
  }

  async removeMeasurement(measurementId: MeasurementId): Promise<void> {
    await this.repository.removeMeasurement(measurementId);
  }

}
