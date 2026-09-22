def balance_data(X, y, method_cls):
    sampler = method_cls()
    return sampler.fit_resample(X, y)
