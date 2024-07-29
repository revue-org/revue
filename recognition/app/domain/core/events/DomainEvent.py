from datetime import datetime
from typing import Any

from pydantic import BaseModel

from app.domain.core.events import DomainEventId


class DomainEvent(BaseModel):
    id: DomainEventId
    type: Any
    timestamp: datetime
    
