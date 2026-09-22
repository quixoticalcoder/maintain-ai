"""
Inference preprocessing module.

Reconstructs the fitted encoder and scaler from training data at startup,
then exposes a lightweight `preprocess` method for single-sample inference.
"""

import logging
from pathlib import Path

import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from maintenance_ml.config.config import CONFIG
from maintenance_ml.data.data_loader import load_data, split_data
from maintenance_ml.preprocessing.cleaning import basic_cleaning
from maintenance_ml.preprocessing.column_handler import drop_irrelevant_columns

logger = logging.getLogger("maintain_ai_api")

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
_BACKEND_DIR = Path(__file__).resolve().parent.parent
_DATA_PATH = _BACKEND_DIR / "data" / "scaled_dataset.csv"


def _convert_failure_to_binary(df: pd.DataFrame) -> pd.DataFrame:
    """Mirror of build_pipeline.convert_failure_to_binary (no import needed)."""
    df = df.copy()
    df["Failure Type"] = df["Failure Type"].apply(
        lambda x: 0 if x == "No Failure" else 1
    )
    return df


class InferencePreprocessor:
    """Holds the fitted encoder + scaler and applies them to new samples."""

    def __init__(self) -> None:
        self._encoder: OneHotEncoder | None = None
        self._scaler: StandardScaler | None = None
        self._categorical_cols: list[str] = CONFIG["categorical_cols"]
        self._drop_cols: list[str] = CONFIG["drop_cols"]
        self._target_col: str = CONFIG["target_col"]

        self._fit_from_training_data()

    # ------------------------------------------------------------------
    # Private helpers
    # ------------------------------------------------------------------

    def _fit_from_training_data(self) -> None:
        """Run the training pipeline once to capture the fitted objects."""
        logger.info("Fitting inference preprocessor from training data …")

        df = load_data(_DATA_PATH)
        df.columns = df.columns.str.replace(r"[\[\]]", "", regex=True)

        df = basic_cleaning(df)
        df = drop_irrelevant_columns(df, self._drop_cols)
        df = _convert_failure_to_binary(df)

        X_train, _, _, _ = split_data(
            df,
            self._target_col,
            test_size=0.2,
            random_state=42,
        )

        # --- fit encoder ---------------------------------------------------
        cat_cols = [
            c for c in self._categorical_cols if c in X_train.columns
        ]
        self._encoder = OneHotEncoder(
            handle_unknown="ignore", sparse_output=False
        )
        self._encoder.fit(X_train[cat_cols])
        self._encoded_col_names = list(
            self._encoder.get_feature_names_out(cat_cols)
        )

        X_train_num = X_train.drop(columns=cat_cols)
        encoded_df = pd.DataFrame(
            self._encoder.transform(X_train[cat_cols]),
            columns=self._encoded_col_names,
            index=X_train.index,
        )
        X_train_full = pd.concat([X_train_num, encoded_df], axis=1)

        # --- fit scaler ----------------------------------------------------
        if CONFIG["scaling"]["enabled"]:
            scaler_cls = CONFIG["scaling"]["scaler"]
            self._scaler = scaler_cls()
            self._scaler.fit(X_train_full)

        self._feature_order = list(X_train_full.columns)
        logger.info(
            "Inference preprocessor ready  —  %d features", len(self._feature_order)
        )

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def preprocess(self, df: pd.DataFrame) -> pd.DataFrame:
        """Transform a raw input DataFrame into the feature space the model
        expects.  The DataFrame must NOT contain the target column."""
        df = basic_cleaning(df)
        df = drop_irrelevant_columns(df, self._drop_cols)

        # encode categorical
        cat_cols = [
            c for c in self._categorical_cols if c in df.columns
        ]
        encoded = pd.DataFrame(
            self._encoder.transform(df[cat_cols]),
            columns=self._encoded_col_names,
            index=df.index,
        )
        df = df.drop(columns=cat_cols)
        df = pd.concat([df, encoded], axis=1)

        # ensure column order matches training
        for col in self._feature_order:
            if col not in df.columns:
                df[col] = 0.0
        df = df[self._feature_order]

        # scale
        if self._scaler is not None:
            scaled = self._scaler.transform(df)
            df = pd.DataFrame(scaled, columns=df.columns, index=df.index)

        return df
