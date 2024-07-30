from pydantic import BaseModel


class SecurityRuleId(BaseModel):
    value: str
