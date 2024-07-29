from datetime import datetime

from pydantic import BaseModel


class TimeSlot(BaseModel):
    from_: datetime
    to: datetime

    class Config:
        fields = {"from_": "from"}
