import React, { useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Settings</h2>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="theme-select">Theme: </label>
        <select id="theme-select" value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div>
        <label>
          <input type="checkbox" checked={notifications} onChange={toggleNotifications} />
          Enable Notifications
        </label>
      </div>

      <div style={{ marginTop: '20px' }}>
        <strong>Current Settings:</strong>
        <p>Theme: {theme}</p>
        <p>Notifications: {notifications ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  );
};

export default Settings;
