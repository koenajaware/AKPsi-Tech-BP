import { useState } from 'react';
import { createUsers } from '../utils/setupUsers';

function Setup() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSetup = async () => {
    setIsLoading(true);
    setMessage('Creating users...');
    try {
      await createUsers();
      setMessage('Users created successfully!');
    } catch (error) {
      setMessage('Error creating users: ' + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Database Setup</h1>
      <p>This page allows you to initialize the database with default users.</p>
      
      <button 
        onClick={handleSetup} 
        disabled={isLoading}
        style={{ marginTop: 20 }}
      >
        {isLoading ? 'Creating Users...' : 'Create Default Users'}
      </button>

      {message && (
        <p style={{ marginTop: 20, color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Setup; 