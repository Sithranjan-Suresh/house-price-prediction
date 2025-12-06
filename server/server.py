from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware  # <-- NEW IMPORT
import util

app = FastAPI()

# --- FIX: ADD CORS MIDDLEWARE ---
# This allows the HTML file in your browser to make requests to the server
origins = [
    "*"  # Allows all origins for development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------------

# Load model and artifacts once at startup
util.load_saved_artifacts()

@app.get("/get_location_names")
async def get_location_names():
    return {"locations": util.get_location_names()}

@app.post("/predict_home_price")
async def predict_home_price( total_sqft: float = Form(...), location: str = Form(...), bhk: int = Form(...), bath: int = Form(...)):

    estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)
    return {"estimated_price": estimated_price}


if __name__ == "__main__":
    print("Starting FastAPI Server For Home Price Prediction...")