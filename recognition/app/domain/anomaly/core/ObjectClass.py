from enum import Enum


class ObjectClass(Enum):
    PERSON = 0
    ANIMAL = 1
    VEHICLE = 2

    def __eq__(self, other):
        return self.value == other.value
