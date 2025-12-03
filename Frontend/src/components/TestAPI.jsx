import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const TestAPI = () => {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const response = await api.get('/health');
      setStatus('✅ Backend Connected: ' + JSON.stringify(response.data));
    } catch (error) {
      setStatus('❌ Backend Connection Failed: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px' }}>
      <h3>API Connection Test</h3>
      <p>{status}</p>
    </div>
  );
};

export default TestAPI;