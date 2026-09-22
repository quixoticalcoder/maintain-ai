def basic_cleaning(df):
    df = df.copy()
    df = df.drop_duplicates()
    return df
