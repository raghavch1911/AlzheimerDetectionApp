import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os

# Load model once when script is imported
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../models/cnn_lstm_model.h5")
model = load_model(model_path)

categories = ['MildDemented', 'ModerateDemented', 'NonDemented', 'VeryMildDemented']

def predict_image(img_bytes):
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (128, 128))
    img = img.reshape(1, 128, 128, 1) / 255.0
    prediction = model.predict(img)
    pred_class = np.argmax(prediction)
    return categories[pred_class]
