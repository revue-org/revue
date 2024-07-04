import { ZodType } from 'zod';
export type AnomalySchema = {
    id: string;
    type: 'outlier' | 'intrusion';
    timestamp: Date;
    data: {
        type: string;
        sourceDeviceId: string;
        timestamp: Date;
        measurementId?: string;
        measure?: {
            type: string;
            unit: string;
        };
        value?: number;
        detectionId?: string;
        objectClass?: string;
        rangeRuleId?: string;
        intrusionRuleId?: string;
    };
};
export declare const anomalySchema: ZodType<AnomalySchema>;
