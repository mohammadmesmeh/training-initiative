import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user, initializing, isAdmin } = useAuth();

  if (initializing) return null;
  if (!user || !isAdmin) return <Navigate to="/" replace />;
  return children;
}
