from typing import Literal

from pydantic import BaseModel


class Contact(BaseModel):
    type: Literal["email", "sms"]
    value: str
