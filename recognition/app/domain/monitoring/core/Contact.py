from . import ContactType


class Contact:
    def __init__(self, value: str, contact_type: ContactType):
        self._value = value
        self._contact_type = contact_type

    def __eq__(self, other):
        return self.value == other.value and self.contact_type == other.contact_type

    @property
    def value(self) -> str:
        return self._value

    @value.setter
    def value(self, value: str):
        self._value = value

    @property
    def contact_type(self) -> ContactType:
        return self._contact_type

    @contact_type.setter
    def contact_type(self, contact_type: ContactType):
        self._contact_type = contact_type
