import os
import unittest

os.environ["TEST"] = "true"


suite = unittest.TestLoader().discover("test")
unittest.TextTestRunner(verbosity=2).run(suite)
