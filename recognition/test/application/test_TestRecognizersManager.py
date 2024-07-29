# import unittest
#
# from app.application.impl import RecognitionServiceImpl
# from app.infrastructure.events.RecognitionEventsHubImpl import RecognitionEventsHubImpl
#
#
# class TestRecognizersManager(unittest.TestCase):
#
#     def setUp(self):
#         self.recognizers_manager = RecognitionServiceImpl(RecognitionEventsHubImpl())
#         self.recognizers_manager.start_recognizing("cam-01")
#
#     def test_add_same_camera(self):
#         self.recognizers_manager.start_recognizing("cam-01")
#         self.assertEqual(len(self.recognizers_manager.recognizers), 1)
#
#     def test_add_different_cameras(self):
#         self.recognizers_manager.start_recognizing("cam-02")
#         self.recognizers_manager.start_recognizing("cam-03")
#         self.assertEqual(len(self.recognizers_manager.recognizers), 3)
#
#     def test_remove_camera(self):
#         self.recognizers_manager.stop_recognizing("cam-01")
#         self.assertEqual(len(self.recognizers_manager.recognizers), 0)
#
#     def test_remove_all_cameras(self):
#         self.recognizers_manager.start_recognizing("cam-01")
#         self.recognizers_manager.stop_all_recognizing()
#         self.assertEqual(len(self.recognizers_manager.recognizers), 0)
