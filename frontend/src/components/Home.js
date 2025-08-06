import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  content: {
    zIndex: 1,
    width: '60%',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    padding: '40px',
    textAlign: 'center',
    color: 'white',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
    animation: 'fadeIn 2s ease-in-out',
  },
  h1: {
    fontSize: '3rem',
    marginBottom: '1rem',
    textShadow: '0 0 20px cyan',
  },
  p: {
    fontSize: '1.5rem',
    textShadow: '0 0 10px cyan',
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

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.h1}>🧠 Alzheimer’s Stage Detection</h1>
        <p style={styles.p}>
          Upload a brain MRI to detect the stage of Alzheimer’s using AI.
        </p>
        <button
          style={styles.button}
          onClick={() => navigate('/detect')}
          onMouseEnter={(e) => (e.target.style.boxShadow = '0 0 40px #00f7ff')}
          onMouseLeave={(e) => (e.target.style.boxShadow = '0 0 20px #00f7ff')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
