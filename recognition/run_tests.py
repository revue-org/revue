import os
import sys
import subprocess


if __name__ == "__main__":
    os.environ["TEST"] = "true"
    process = subprocess.run(
        args=[
            sys.executable,
            "-m",
            "unittest",
            "discover",
            "-v",
            "-s",
            "test",
            "-p",
            "test_*.py",
        ],
        env=os.environ,
    )
    exit(process.returncode)
