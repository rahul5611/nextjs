import React from 'react';
import './css/loading.css';

const Loading = ({ message = "Loading...", overlay = true }) => {
  return (
    <div className={overlay ? "loading-overlay" : ""}>
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;


