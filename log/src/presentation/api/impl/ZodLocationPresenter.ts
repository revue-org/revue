// import { LocationPresenter } from '@/presentation/api/LocationPresenter.js'
// import { z, ZodType } from 'zod'
// import { Location } from '@/domain/core/Location'
// import { BuildingInsertion, RoomInsertion, RoomUpdate } from '../schemas/LocationSchemas'
// import { Detection, Intrusion, Measurement, MeasureType, MeasureUnit, Outlier } from 'common/dist/domain/core'
//
// export class ZodLocationPresenter implements LocationPresenter {
//   private readonly outlierSchema: ZodType<Outlier>
//   private readonly intrusionSchema: ZodType<Intrusion>
//   private readonly measurementSchema: ZodType<Measurement>
//   private readonly detectionSchema: ZodType<Detection>
//
//   constructor() {
//     this.measurementSchema = z.object({
//       id: z.object({
//         value: z.string(),
//       }),
//       timestamp: z.date(),
//       type: z.literal('measurement'),
//       value: z.number(),
//       sourceDeviceId: z.string(),
//       measure: z.object({
//         type: z.nativeEnum(MeasureType),
//         unit: z.nativeEnum(MeasureUnit)
//       }),
//     })
//
//     this.outlierSchema = z.object({
//       id: z.object({
//         value: z.string(),
//       }),
//       locationId: z.string(),
//       type: z.literal('outlier'),
//       value: z.number(),
//       timestamp: z.date(),
//       measurement: this.measurementSchema,
//       rangeRuleId: z.string(),
//     })
//
//
//
//   }
//
//   parse(obj: object): Location {
//     return this.outlierSchema.parse(obj)
//   }
//
//   parseBuildingInsertion(obj: object): BuildingInsertion {
//     return this.buildingSchema.parse(obj)
//   }
//
//   parseBuildingUpdate(obj: object): BuildingInsertion {
//     return this.buildingSchema.parse(obj)
//   }
//
//   parseRoomInsertion(obj: object): RoomInsertion {
//     return this.roomInsertionSchema.parse(obj)
//   }
//
//   parseRoomUpdate(obj: object): RoomUpdate {
//     return this.roomUpdateSchema.parse(obj)
//   }
// }
