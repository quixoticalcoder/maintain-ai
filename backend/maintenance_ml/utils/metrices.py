import matplotlib.pyplot as plt
import numpy as np

def plot_confusion_matrix(
    cm,
    title="Confusion Matrix",
    normalize=False
):
    """
    Confusion matrix format assumed:
    [[TN, FP],
     [FN, TP]]
    """

    class_names = ["No Failure", "Failure"]

    if normalize:
        cm = cm.astype("float") / cm.sum(axis=1, keepdims=True)

    fig, ax = plt.subplots(figsize=(6, 5))
    im = ax.imshow(cm)

    ax.set_title(title)
    plt.colorbar(im, ax=ax)

    ax.set_xticks(np.arange(2))
    ax.set_yticks(np.arange(2))
    ax.set_xticklabels(class_names)
    ax.set_yticklabels(class_names)

    ax.set_xlabel("Predicted Label")
    ax.set_ylabel("Actual Label")

    # Annotate values
    for i in range(2):
        for j in range(2):
            value = cm[i, j]
            text = f"{value:.2f}" if normalize else int(value)
            ax.text(j, i, text, ha="center", va="center", fontsize=12)

    plt.tight_layout()
    plt.show()