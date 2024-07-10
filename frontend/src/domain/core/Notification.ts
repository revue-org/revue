export interface Notification {
  readonly id: string
  readonly event: {
    readonly type: string
    readonly timestamp: Date
    readonly sourceDeviceId: string
    readonly measurementId?: string
    readonly measure?: {
      readonly type: string
      readonly unit: string
    }
    readonly value?: number
    readonly detectionId?: string
    readonly objectClass?: string
    readonly rangeRuleId?: string
    readonly intrusionRuleId?: string
  }
  readonly message: string
}
