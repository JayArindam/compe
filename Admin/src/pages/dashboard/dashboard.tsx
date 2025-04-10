import React from 'react';

const Dashboard: React.FC = () => {
  const username = localStorage.getItem('username') || 'Admin';

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>You are now on the admin dashboard.</p>
    </div>
  );
};

export default Dashboard;