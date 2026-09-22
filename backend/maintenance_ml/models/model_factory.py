from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

def get_model(model_name):
    models = {
        "logistic": LogisticRegression(max_iter=1000),
        "decision_tree": DecisionTreeClassifier(),
        "svm": SVC(probability=True)
    }

    if model_name not in models:
        raise ValueError("Model not supported")

    return models[model_name]
