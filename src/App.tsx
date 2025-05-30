import React, { useState } from 'react';
import AuthPage from './pages/AuthPage';
//import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  return (
    <div className="min-h-screen">
      {isAuthenticated ? (
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
};

export default App;
