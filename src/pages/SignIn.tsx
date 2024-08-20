import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (isAuthenticated) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-4 justify-center flex text-center border shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">Sign In</h1>
        <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        </div>
        <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
