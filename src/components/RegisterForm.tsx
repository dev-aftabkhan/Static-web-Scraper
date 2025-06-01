import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  onSuccess: () => void;
}

const RegisterForm: React.FC<Props> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://20.244.50.12:4000/api/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      onSuccess();
      window.location.reload();
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col space-y-4 w-64">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <button type="submit" className="bg-green-500 text-white py-2 rounded">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;