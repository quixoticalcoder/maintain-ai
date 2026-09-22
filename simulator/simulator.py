import random
import requests
import time
import logging

API_URL = "http://127.0.0.1:8000/predict"  # change when deploying

# Machine state (persistent)
machines = [
    {"id": "M1", "type": "L", "hours": 1200},
    {"id": "M2", "type": "L", "hours": 1500},
    {"id": "M3", "type": "M", "hours": 2000},
    {"id": "M4", "type": "H", "hours": 2500},
]

# Realistic ranges
RANGES = {
    "Air temperature K": (295, 315),
    "Process temperature K": (305, 325),
    "Rotational speed rpm": (1200, 1800),
    "Torque Nm": (10, 60),
    "Vibration Levels": (0.01, 0.05),
}

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)

# Gaussian value generator
def generate_value(min_val, max_val):
    mean = (min_val + max_val) / 2
    std = (max_val - min_val) / 6
    value = random.gauss(mean, std)
    return max(min(value, max_val), min_val)

# Stateful operational hours update
def update_operational_hours(machine):
    # Simulate ~3–4 seconds runtime
    if random.random() < 0.95:  # 95% chance machine is running
        machine["hours"] += 0.001  # ~3.6 sec
    return int(machine["hours"])

# Generate machine data
def generate_machine_data(machine):
    torque = generate_value(*RANGES["Torque Nm"])

    data = {
        "Product ID": machine["id"],  # FIXED field name
        "type": machine["type"],
        "Air temperature K": round(generate_value(*RANGES["Air temperature K"]), 2),
        "Process temperature K": round(generate_value(*RANGES["Process temperature K"]), 2),
        "Rotational speed rpm": int(generate_value(*RANGES["Rotational speed rpm"])),
        "Torque Nm": round(torque, 2),

        # Correlated vibration (more realistic)
        "Vibration Levels": round((torque / 200) + random.uniform(0, 0.01), 4),

        "Operational Hours": update_operational_hours(machine),
    }

    # Anomaly injection (simulate failure behavior)
    if random.random() < 0.1:
        data["Torque Nm"] *= 1.5
        data["Vibration Levels"] *= 2
        data["Process temperature K"] += 5

    return data

# Send data to API
def send_data(data):
    try:
        response = requests.post(API_URL, json=data, timeout=5)
        logging.info(f"{data['Product ID']} → {response.status_code} → {response.text}")
    except Exception as e:
        logging.error(f"Error sending data: {e}")

# Main loop
def run_simulator():
    logging.info("Simulator started...")

    while True:
        for machine in machines:
            data = generate_machine_data(machine)

            logging.info(f"Sending: {data}")  # debug log
            send_data(data)

        time.sleep(3)


# Run directly
if __name__ == "__main__":
    run_simulator()