def drop_irrelevant_columns(df, cols_to_drop):
    df = df.copy()
    return df.drop(columns=cols_to_drop, errors="ignore")
