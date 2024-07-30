import os
from pathlib import Path

from dotenv import load_dotenv

_home = Path.home()

_descending_priority_env_paths = [
    Path(os.getcwd()).parent / ".env",
    _home / "revue" / ".env",
]


def _get_env_var_or_fail(var_name: str) -> str:
    value = os.environ.get(var_name)
    if value is None:
        raise ValueError(f"Environment variable {var_name} not set")
    return value


for path in _descending_priority_env_paths:
    if path.exists():
        load_dotenv(path, override=False)

FLASK_ENV = os.getenv("FLASK_ENV")
ENV = _get_env_var_or_fail("ENV")

ALARM_HOST = (
    "localhost" if FLASK_ENV == "develop" else _get_env_var_or_fail("ALARM_HOST")
)
ALARM_PORT = _get_env_var_or_fail("ALARM_PORT")
RECOGNITION_BEARER_TOKEN = _get_env_var_or_fail("RECOGNITION_BEARER_TOKEN")
MEDIA_SERVER_HOST = _get_env_var_or_fail("MEDIA_SERVER_HOST")
MEDIA_SERVER_RTSP_PORT = _get_env_var_or_fail("MEDIA_SERVER_RTSP_PORT")
