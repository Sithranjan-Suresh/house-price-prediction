# House Price Prediction Web App

This is a full-stack machine learning project that predicts house prices based on location, number of bedrooms (BHK), bathrooms, and square footage in Bengaluru, India. Users can select options in a beautiful frontend and get an estimated price instantly.

---

## Features

* Select **location** from available neighborhoods
* Choose **number of bedrooms (BHK)** and **bathrooms**
* Enter **square footage**
* Get **predicted price** in Lakhs
* Fully functioning frontend connected to a FastAPI backend

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Sithranjan-Suresh/house-price-prediction.git
cd house-price-prediction
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start the server:

```bash
uvicorn server:app --reload
```

4. Open the frontend in your browser (`/client/index.html`) and interact with the app.

---

## ML Details

* Dataset: Kaggle house price dataset (cleaned and processed)
* Model: Linear Regression (trained on square footage, BHK, bathrooms, and location)
* Preprocessing: Cleaned missing values, one-hot encoded locations

---

## Future Improvements

* Add more advanced models (Random Forest, XGBoost)
* Add historical price trends for each location

---

## License

MIT License
