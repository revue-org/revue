import threading


def set_interval(func, seconds) -> threading.Timer:
    def func_wrapper() -> None:
        set_interval(func, seconds)
        func()

    t = threading.Timer(seconds, func_wrapper)
    t.start()
    return t
