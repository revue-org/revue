import unittest


class TestMyClass(unittest.TestCase):
    # test methods' names should begin with `test_`
    def test_my_method(self):
        self.assertEqual("Hello World", x)
