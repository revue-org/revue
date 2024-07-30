from pydantic import BaseModel


class DomainEventId(BaseModel):
    value: str
