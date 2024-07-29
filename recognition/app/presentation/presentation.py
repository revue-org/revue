import json
import re
from typing import Type, TypeVar, Callable, List

from pydantic import BaseModel

import app.domain.core.events as _core_domain_events
import app.domain.core.rules as _core_domain_rules

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


def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


def snake_to_camel(name):
    components = name.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])


def transform_keys(obj: dict | List[dict], transform_func: Callable[[str], str]) -> dict | List[dict]:
    """
    Transform keys of a dictionary or a list of dictionaries
    :param obj: the object to transform
    :param transform_func: the function to apply to the keys (camel_to_snake or snake_to_camel)
    :return: the transformed dict
    """
    if isinstance(obj, dict):
        new_obj = {}
        for k, v in obj.items():
            new_obj[transform_func(k)] = transform_keys(v, transform_func)
        return new_obj
    elif isinstance(obj, list):
        return [transform_keys(item, transform_func) for item in obj]
    else:
        return obj
