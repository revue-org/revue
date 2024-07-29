from typing import Literal

from pydantic import BaseModel


class Contact(BaseModel):
    value: str
    type: Literal["email", "sms"]
