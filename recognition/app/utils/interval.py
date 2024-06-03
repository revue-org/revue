import threading


def set_timeout(func, seconds) -> threading.Timer:
    def func_wrapper() -> None:
        func()

    t = threading.Timer(seconds, func_wrapper)
    t.start()
    return t


def set_interval(func, seconds) -> threading.Timer:
    def func_wrapper() -> None:
        func()
        set_interval(func, seconds)

    t = threading.Timer(seconds, func_wrapper)
    t.start()
    return t
