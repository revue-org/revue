// import { z } from 'zod'

// export class SecurityRulePresenter {
//   private schema: z.ZodType<{deviceId: string, isEnabled: boolean}>;
//   private schemaDomainEventId: z.ZodType<DomainEventId>;
//   constructor() {
//     this.schemaDomainEventId = z.object({
//       id: z.string(),
//     })
//
//     this.schema = z.object({
//       id: this.schemaDomainEventId,
//       timestamp: z.date(),
//       type: z.nativeEnum(AnomalyType),
//     });
//   }
//
//   serialize(object: any): string {
//     return JSON.stringify(object);
//   }
//
//   deserialize(json: string): Anomaly {
//
//     const  this.schema.parse(JSON.parse(json));
//   }
// }
