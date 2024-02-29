import unittest
from app.MyClass import MyClass


class TestMyClass(unittest.TestCase):
    # test methods' names should begin with `test_`
    def test_my_method(self):
        x = MyClass().my_method()
        self.assertEqual("Hello World", x)
