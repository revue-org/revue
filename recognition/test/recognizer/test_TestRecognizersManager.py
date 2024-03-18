import unittest

from app.recognizer.RecognizersManager import RecognizersManager


class TestRecognizersManager(unittest.TestCase):

    def setUp(self):
        self.recognizers_manager = RecognizersManager()
        self.recognizers_manager.add_camera("cam-01")

    def test_add_same_camera(self):
        self.recognizers_manager.add_camera("cam-01")
        self.assertEqual(len(self.recognizers_manager.recognizers), 1)

    def test_add_different_cameras(self):
        self.recognizers_manager.add_camera("cam-02")
        self.recognizers_manager.add_camera("cam-03")
        self.assertEqual(len(self.recognizers_manager.recognizers), 3)

    def test_remove_camera(self):
        self.recognizers_manager.remove_camera("cam-01")
        self.assertEqual(len(self.recognizers_manager.recognizers), 0)

    def test_remove_all_cameras(self):
        self.recognizers_manager.add_camera("cam-01")
        self.recognizers_manager.remove_all_cameras()
        self.assertEqual(len(self.recognizers_manager.recognizers), 0)
