import React from 'react';
import { useNavigate } from 'react-router-dom';

function Info() {
  const prediction = localStorage.getItem("prediction");
  const navigate = useNavigate();

  const infoMap = {
    "NonDemented": {
      description: "No signs of Alzheimer’s detected.",
      precautions: "Maintain a healthy lifestyle and routine checkups."
    },
    "VeryMildDemented": {
      description: "Slight memory issues that do not affect daily life.",
      precautions: "Engage in memory exercises, sleep well, eat healthy."
    },
    "MildDemented": {
      description: "Memory problems noticeable to friends and family.",
      precautions: "Consult neurologist, start treatment, stay socially active."
    },
    "ModerateDemented": {
      description: "Serious memory loss and confusion. Needs help daily.",
      precautions: "Full-time care, safety at home, medication."
    }
  };

  const current = infoMap[prediction] || {
    description: "Prediction not found.",
    precautions: "Please try again with another image."
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
    h2: {
      fontSize: '2rem',
      textShadow: '0 0 15px cyan',
      marginBottom: '20px',
    },
    p: {
      fontSize: '1.2rem',
      margin: '10px 0',
      textShadow: '0 0 8px cyan',
    },
    button: {
      marginTop: '20px',
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
        <h2 style={styles.h2}>Result: {prediction}</h2>
        <p style={styles.p}><strong>Description:</strong> {current.description}</p>
        <p style={styles.p}><strong>Precautions:</strong> {current.precautions}</p>
        <button
          style={styles.button}
          onClick={() => navigate("/detect")}
          onMouseEnter={(e) => (e.target.style.boxShadow = '0 0 40px #00f7ff')}
          onMouseLeave={(e) => (e.target.style.boxShadow = '0 0 20px #00f7ff')}
        >
          Try Another Image
        </button>
      </div>
    </div>
  );
}

export default Info;
