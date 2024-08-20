import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? (
    <div className="max-w-md mx-auto p-4 ">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {/* Dashboard content goes here */}
    </div>
  ) : null;
};

export default Dashboard;
