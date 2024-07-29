from app.domain.core.events import DomainEvent


class DeviceEvent(DomainEvent):
    source_device_id: str
