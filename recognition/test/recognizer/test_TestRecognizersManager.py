import unittest

from app.recognizer.RecognizersManager import RecognizersManager


class TestRecognizersManager(unittest.TestCase):

    def setUp(self):
        self.recognizers_manager = RecognizersManager()
        self.recognizers_manager.add_object_to_recognize("person", "cam-01")

    def test_add_object_to_same_camera(self):
        self.recognizers_manager.add_object_to_recognize("animal", "cam-01")
        self.assertEqual(len(self.recognizers_manager.recognizers), 1)

    def test_add_object_to_different_cameras(self):
        self.recognizers_manager.add_object_to_recognize("person", "cam-02")
        self.assertEqual(len(self.recognizers_manager.recognizers), 2)

    def test_add_duplicate_object(self):
        self.recognizers_manager.add_object_to_recognize("person", "cam-01")
        self.recognizers_manager.add_object_to_recognize("person", "cam-01")
        self.assertEqual(
            len(self.recognizers_manager.recognizers["cam-01"].objects_to_recognize), 1
        )

    def test_remove_object(self):
        self.recognizers_manager.remove_object_to_recognize("animal", "cam-01")
        self.assertEqual(len(self.recognizers_manager.recognizers), 1)
        self.recognizers_manager.remove_object_to_recognize("person", "cam-01")
        self.assertEqual(len(self.recognizers_manager.recognizers), 0)

    def test_remove_all_objects(self):
        self.recognizers_manager.add_object_to_recognize("animal", "cam-01")
        self.recognizers_manager.remove_all_objects_to_recognize()
        self.assertEqual(len(self.recognizers_manager.recognizers), 0)
