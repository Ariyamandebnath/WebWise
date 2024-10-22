// src/App.tsx
import React from 'react';
import ActivityLog from './components/ActivityLog';
import './App.css'; // Import your CSS file

const App: React.FC = () => {
  return (
    <div>
      <h1>My Browsing Activity Tracker</h1>
      <ActivityLog />
    </div>
  );
};

export default App;
