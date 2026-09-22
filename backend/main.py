"""
maintain-ai API  —  FastAPI entry-point.

Provides a single POST /predict endpoint that accepts machine sensor values,
applies the same preprocessing as training, and returns a failure prediction
with confidence.
"""

import logging
import os
import sys
import traceback
from contextlib import asynccontextmanager
from pathlib import Path

import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException

# ---------------------------------------------------------------------------
# Ensure the backend directory is on sys.path so that maintenance_ml is
# importable when running with `uvicorn main:app` from backend/.
# ---------------------------------------------------------------------------
_BACKEND_DIR = Path(__file__).resolve().parent
if str(_BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(_BACKEND_DIR))

from api.preprocessing import InferencePreprocessor  # noqa: E402
from api.schemas import PredictionRequest, PredictionResponse  # noqa: E402
from maintenance_ml.utils.model_io import load_model  # noqa: E402

# ---------------------------------------------------------------------------
# Logging setup
# ---------------------------------------------------------------------------
_LOG_DIR = _BACKEND_DIR / "logs"
_LOG_DIR.mkdir(parents=True, exist_ok=True)

_LOG_FORMAT = "%(asctime)s | %(levelname)s | %(message)s"
_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

logger = logging.getLogger("maintain_ai_api")
logger.setLevel(logging.INFO)

# Console handler
_console_handler = logging.StreamHandler()
_console_handler.setFormatter(logging.Formatter(_LOG_FORMAT, datefmt=_DATE_FORMAT))
logger.addHandler(_console_handler)

# File handler (append mode)
_file_handler = logging.FileHandler(_LOG_DIR / "app.log", mode="a", encoding="utf-8")
_file_handler.setFormatter(logging.Formatter(_LOG_FORMAT, datefmt=_DATE_FORMAT))
logger.addHandler(_file_handler)

# ---------------------------------------------------------------------------
# Model & preprocessor  (loaded once at startup)
# ---------------------------------------------------------------------------
_MODEL_PATH = (
    _BACKEND_DIR / "models" / "fine_tuned_balanced_random_forest_failure_prediction.joblib"
)

_LABEL_MAP = {0: "No Failure", 1: "Failure"}

model = None
preprocessor = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown lifecycle hook."""
    global model, preprocessor

    logger.info("Loading trained model from %s …", _MODEL_PATH)
    model = load_model(str(_MODEL_PATH))

    preprocessor = InferencePreprocessor()

    logger.info("API started successfully")
    yield
    logger.info("API shutting down")


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------
app = FastAPI(
    title="maintain-ai API",
    description=(
        "Accepts machine sensor readings and returns a failure prediction "
        "using a fine-tuned Balanced Random Forest model."
    ),
    version="1.0.0",
    lifespan=lifespan,
)


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------
@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """Return a failure prediction for the supplied sensor data."""
    try:
        logger.info("Received prediction request: %s", request.model_dump())

        # 1. Convert request → DataFrame (column names must match training)
        row = {
            "Product ID": request.product_id,
            "Type": request.type,
            "Air temperature K": request.air_temperature,
            "Process temperature K": request.process_temperature,
            "Rotational speed rpm": request.rotational_speed,
            "Torque Nm": request.torque,
            "Vibration Levels": request.vibration_levels,
            "Operational Hours": request.operational_hours,
        }
        df = pd.DataFrame([row])

        # 2. Preprocess
        X = preprocessor.preprocess(df)

        # 3. Predict
        prediction_int = int(model.predict(X)[0])
        label = _LABEL_MAP.get(prediction_int, "Unknown")

        # Confidence: probability of the predicted class
        if hasattr(model, "predict_proba"):
            probas = model.predict_proba(X)[0]
            confidence = float(np.max(probas))
        else:
            confidence = 1.0

        logger.info("Prediction: %s | Confidence: %.2f", label, confidence)

        return PredictionResponse(prediction=label, confidence=round(confidence, 4))

    except Exception as exc:
        error_msg = f"{type(exc).__name__}: {exc}"
        logger.error("Error occurred: %s\n%s", error_msg, traceback.format_exc())
        raise HTTPException(status_code=500, detail=error_msg) from exc
