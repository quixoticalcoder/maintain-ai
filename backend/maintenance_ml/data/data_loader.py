import pandas as pd
from sklearn.model_selection import train_test_split

def load_data(path):
    return pd.read_csv(path)

def split_data(df, target_col, test_size, random_state):
    X = df.drop(columns=[target_col])
    y = df[target_col]

    return train_test_split(
        X, y,
        test_size=test_size,
        random_state=random_state,
        stratify=y
    )