import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Detect() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setPrediction('');
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await axios.post('http://127.0.0.1:8000/predict', formData);
      const result = res.data.prediction;
      setPrediction(result);
      localStorage.setItem('prediction', result);
      navigate('/info');
    } catch (err) {
      console.error('Error during prediction:', err);
      alert('Prediction failed. Make sure backend is running.');
    }
  };

  const styles = {
    wrapper: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
    },
    content: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      padding: '40px',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
      animation: 'fadeIn 2s ease-in-out',
      width: '90%',
      maxWidth: '500px',
    },
    input: {
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1px solid #00f7ff',
      backgroundColor: 'black',
      color: 'white',
      marginBottom: '20px',
    },
    img: {
      width: '100%',
      maxWidth: '300px',
      borderRadius: '10px',
      boxShadow: '0 0 10px cyan',
      margin: '10px 0',
    },
    button: {
      marginTop: '15px',
      padding: '12px 28px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '1.1rem',
      background: 'linear-gradient(to right, #00f7ff, #00d9ff)',
      color: '#000',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 0 20px #00f7ff',
      transition: '0.3s',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.content}>
        <h2>Upload Brain MRI</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.input}
        />
        {preview && <img src={preview} alt="Preview" style={styles.img} />}
        <br />
        <button
          style={styles.button}
          onClick={handleUpload}
          onMouseEnter={(e) => (e.target.style.boxShadow = '0 0 40px #00f7ff')}
          onMouseLeave={(e) => (e.target.style.boxShadow = '0 0 20px #00f7ff')}
        >
          Predict
        </button>
        {prediction && <p>Prediction: {prediction}</p>}
      </div>
    </div>
  );
}

export default Detect;
