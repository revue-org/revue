from typing import List, Literal

from app.domain.core.rules import SecurityRuleId, Contact, TimeSlot
from pydantic import BaseModel


class SecurityRule(BaseModel):
    type: Literal["range", "intrusion"]
    id: SecurityRuleId
    creator_id: str
    active_on: str
    description: str
    contacts: List[Contact]
    enabled: bool
    validity: TimeSlot
