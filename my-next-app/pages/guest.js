import React from 'react';

const GuestUserComponent = ({ onLogin, onSignup }) => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Our Website!</h1>
      <p style={styles.description}>
        Discover a platform where you can connect, share, and grow. Join our community to access exclusive content, participate in discussions, and enjoy personalized features. 
      </p>
      
      <div style={styles.featuresContainer}>
        <h3>Why Join Us?</h3>
        <ul style={styles.featuresList}>
          <li>✔️ Access premium articles and resources</li>
          <li>✔️ Participate in engaging forums</li>
          <li>✔️ Personalized content tailored for you</li>
          <li>✔️ Stay updated with the latest news and trends</li>
        </ul>
      </div>
      
      
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  featuresContainer: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  featuresList: {
    listStyle: 'none',
    paddingLeft: '0',
    lineHeight: '1.6',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  },
  buttonSecondary: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid #007BFF',
    borderRadius: '5px',
    backgroundColor: '#fff',
    color: '#007BFF',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  }
};

export default GuestUserComponent;