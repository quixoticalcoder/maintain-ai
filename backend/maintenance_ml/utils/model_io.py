import joblib
from pathlib import Path

def save_model(model, model_name, save_dir="artifacts"):
    """
    Saves a trained ML model to disk.

    Parameters:
    - model: trained sklearn model
    - model_name (str): name of the model file (without extension)
    - save_dir (str): directory to save the model
    """

    save_dir = Path(save_dir)
    save_dir.mkdir(parents=True, exist_ok=True)

    model_path = save_dir / f"{model_name}.joblib"
    joblib.dump(model, model_path)

    print(f"Model saved at: {model_path}")

    return model_path


def load_model(model_path):
    """
    Loads a saved ML model from disk.
    """
    model = joblib.load(model_path)
    print(f"Model loaded from: {model_path}")
    return model
