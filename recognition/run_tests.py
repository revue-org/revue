import os
import unittest

os.environ["TEST"] = "true"


suite = unittest.TestLoader().discover("test")
result = unittest.TextTestRunner(verbosity=2).run(suite)

exit(0) if result.wasSuccessful() else exit(1)
