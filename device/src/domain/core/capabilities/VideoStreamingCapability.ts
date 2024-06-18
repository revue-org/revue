import { CapabilityType } from "@/domain/core/capabilities/CapabilityType";

export interface VideoStreamingCapability {
  readonly type: CapabilityType.VIDEO
  readonly resolution: '720p' | '1080p' | '4k'
}
