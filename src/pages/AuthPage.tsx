import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

interface Props {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<Props> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h1>
      {isLogin ? (
        <LoginForm onSuccess={onAuthSuccess} />
      ) : (
        <RegisterForm onSuccess={onAuthSuccess} />
      )}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-600 hover:underline"
      >
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default AuthPage;