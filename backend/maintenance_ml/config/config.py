from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE

CONFIG = {
    "target_col": "Failure Type",   

    "drop_cols": ["UDI", "Product ID"],

    "categorical_cols": ["Type"],

    "scaling": {
        "enabled": True,
        "scaler": StandardScaler
    },

    "balancing": {
        "enabled": True,
        "method": SMOTE
    }
}
