from fastapi import FastAPI
import threading
from simulator import run_simulator

app = FastAPI()

@app.on_event("startup")
def start_simulator():
    thread = threading.Thread(target=run_simulator)
    thread.daemon = True
    thread.start()

@app.get("/")
def health_check():
    return {"status": "Simulator running"}