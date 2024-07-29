from app.domain.core.events import DomainEvent


class DeviceEvent(DomainEvent):
    sourceDeviceId: str
    
