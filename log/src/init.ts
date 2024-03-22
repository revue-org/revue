import { model, Model } from 'mongoose'
import { LogService } from 'domain/dist/application/log/LogService.js'
import { LogServiceImpl } from 'domain/dist/application/log/impl/LogServiceImpl.js'
import { EnvironmentDataRepository } from 'domain/dist/domain/device/repositories/EnvironmentDataRepository.js'
import { EnvironmentDataRepositoryImpl } from 'domain/dist/storage/device/EnvironmentDataRepositoryImpl.js'
import { EnvironmentData } from "domain/dist/domain/device/core/EnvironmentData.js";
import { environmentDataSchema } from 'domain/dist/storage/device/schemas/EnvironmentDataSchema.js'

export const environmentDataModel: Model<EnvironmentData> = model<EnvironmentData>(
  'EnvironmentData',
  environmentDataSchema,
  'environmentData'
)
const environmentDataRepository: EnvironmentDataRepository = new EnvironmentDataRepositoryImpl(
  environmentDataModel
)

export const logService: LogService = new LogServiceImpl(environmentDataRepository)
