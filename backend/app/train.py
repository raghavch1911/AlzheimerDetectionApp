import os, cv2
import numpy as np
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Model
from tensorflow.keras.layers import (
    Conv2D, MaxPooling2D, Reshape, LSTM, Bidirectional,
    Dense, Input
)
from tensorflow.keras.utils import to_categorical

IMG_SIZE = 128

# Dataset path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "../data/Alzheimer_Dataset")

# Class labels
categories = ['MildDemented', 'ModerateDemented', 'NonDemented', 'VeryMildDemented']

def load_data():
    data = []
    print("📁 Searching dataset in:", os.path.abspath(DATASET_PATH))
    for category in categories:
        folder = os.path.join(DATASET_PATH, category)
        print(f"🔍 Loading {category} from: {folder}")
        label = categories.index(category)
        if not os.path.exists(folder):
            print(f"❌ Folder not found: {folder}")
            continue
        for img_name in os.listdir(folder):
            try:
                img_path = os.path.join(folder, img_name)
                img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
                if img is None:
                    print(f"⚠️ Skipping unreadable image: {img_path}")
                    continue
                img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
                data.append([img, label])
            except Exception as e:
                print(f"⚠️ Error loading image {img_name}: {e}")
                continue
    return data

def build_cnn_rnn_model():
    input_layer = Input(shape=(IMG_SIZE, IMG_SIZE, 1))

    # CNN feature extraction
    x = Conv2D(32, (3, 3), activation='relu')(input_layer)
    x = MaxPooling2D((2, 2))(x)
    x = Conv2D(64, (3, 3), activation='relu')(x)
    x = MaxPooling2D((2, 2))(x)

    # Reshape to sequence (time steps = width × height, features = depth)
    x = Reshape((x.shape[1] * x.shape[2], x.shape[3]))(x)

    # RNN sequence modeling
    x = Bidirectional(LSTM(64))(x)

    # Output layer
    output = Dense(4, activation='softmax')(x)

    return Model(inputs=input_layer, outputs=output)

def main():
    data = load_data()
    if not data:
        print("❌ No data found. Please check dataset path and image folders.")
        return

    np.random.shuffle(data)
    X, y = zip(*data)
    X = np.array(X).reshape(-1, IMG_SIZE, IMG_SIZE, 1) / 255.0
    y = to_categorical(y, 4)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    model = build_cnn_rnn_model()
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    print("🚀 Training hybrid CNN + RNN model...")
    model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test))

    save_path = os.path.join(BASE_DIR, "../models/cnn_lstm_model.h5")
    model.save(save_path)
    print(f"✅ Model saved to {os.path.abspath(save_path)}")

if __name__ == "__main__":
    main()
