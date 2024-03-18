class Resolution:
    def __init__(self, width: int, height: int):
        self._width = width
        self._height = height

    @property
    def width(self) -> int:
        return self._width

    @width.setter
    def width(self, width) -> None:
        self._width = width

    @property
    def height(self) -> int:
        return self._height

    @height.setter
    def height(self, height) -> None:
        self._height = height
