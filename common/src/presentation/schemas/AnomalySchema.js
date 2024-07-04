import { z } from 'zod';
export const anomalySchema = z.object({
    id: z.string(),
    type: z.enum(['outlier', 'intrusion']),
    timestamp: z.date(),
    data: z.object({
        type: z.string(),
        sourceDeviceId: z.string(),
        timestamp: z.date(),
        measurementId: z.string().optional(),
        measure: z
            .object({
            type: z.string(),
            unit: z.string()
        })
            .optional(),
        value: z.number().optional(),
        detectionId: z.string().optional(),
        objectClass: z.string().optional(),
        intrusionRuleId: z.string().optional(),
        rangeRuleId: z.string().optional()
    })
});
