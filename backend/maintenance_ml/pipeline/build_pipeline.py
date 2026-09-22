from maintenance_ml.config.config import CONFIG
from maintenance_ml.data.data_loader import split_data
from maintenance_ml.preprocessing.cleaning import basic_cleaning
from maintenance_ml.preprocessing.column_handler import drop_irrelevant_columns
from maintenance_ml.preprocessing.encoding import encode_categorical
from maintenance_ml.preprocessing.scaling import scale_features
from maintenance_ml.balancing.balancer import balance_data

def convert_failure_to_binary(df):
    df = df.copy()
    df["Failure Type"] = df["Failure Type"].apply(lambda x: 0 if x == "No Failure" else 1)
    return df

def run_pipeline(df):
    df = basic_cleaning(df)

    df = drop_irrelevant_columns(df, CONFIG["drop_cols"])

    # Convert target IN-PLACE
    df = convert_failure_to_binary(df)

    X_train, X_test, y_train, y_test = split_data(
        df,
        CONFIG["target_col"],   # "Failure Type"
        test_size=0.2,
        random_state=42
    )

    # Encode categorical features (ONLY Type)
    X_train, X_test = encode_categorical(
        X_train,
        X_test,
        CONFIG["categorical_cols"]
    )

    if CONFIG["balancing"]["enabled"]:
        X_train, y_train = balance_data(
            X_train,
            y_train,
            CONFIG["balancing"]["method"]
        )

    if CONFIG["scaling"]["enabled"]:
        X_train, X_test = scale_features(
            X_train,
            X_test,
            CONFIG["scaling"]["scaler"]
        )

    return X_train, X_test, y_train, y_test
