import json
from typing import Type, TypeVar

from pydantic import BaseModel

import app.domain.core.rules as _core_domain_rules
import app.domain.core.events as _core_domain_events

T = TypeVar("T", bound=BaseModel)
core_modules = [_core_domain_rules, _core_domain_events]


def _is_admissible_type(obj: type) -> bool:
    for core_module in core_modules:
        for name in dir(core_module):
            symbol = getattr(core_module, name)
            if isinstance(symbol, type) and issubclass(obj, symbol):
                return True
    return False


def serialize(obj: BaseModel) -> dict:
    if not _is_admissible_type(type(obj)):
        raise ValueError(f"Type {type(obj)} is not admissible")
    return json.loads(obj.model_dump_json())


def deserialize(obj: dict, klass: Type[T]) -> T:
    if not _is_admissible_type(klass):
        raise ValueError(f"Type {klass} is not admissible")
    return klass(**obj)
