from sklearn.preprocessing import OneHotEncoder
import pandas as pd

def encode_categorical(X_train, X_test, categorical_cols):

    categorical_cols = [
        c for c in categorical_cols 
        if c in X_train.columns and c in X_test.columns
    ]

    print("Encoding columns:", categorical_cols)

    if not categorical_cols:
        return X_train, X_test

    encoder = OneHotEncoder(
        handle_unknown="ignore",
        sparse_output=False
    )

    X_train_encoded = encoder.fit_transform(X_train[categorical_cols])
    X_test_encoded = encoder.transform(X_test[categorical_cols])

    encoded_cols = encoder.get_feature_names_out(categorical_cols)

    X_train_enc_df = pd.DataFrame(
        X_train_encoded,
        columns=encoded_cols,
        index=X_train.index
    )

    X_test_enc_df = pd.DataFrame(
        X_test_encoded,
        columns=encoded_cols,
        index=X_test.index
    )

    X_train = X_train.drop(columns=categorical_cols)
    X_test = X_test.drop(columns=categorical_cols)

    X_train = pd.concat([X_train, X_train_enc_df], axis=1)
    X_test = pd.concat([X_test, X_test_enc_df], axis=1)

    return X_train, X_test
