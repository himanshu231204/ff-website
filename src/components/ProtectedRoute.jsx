import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="ui-page ui-shell flex items-center justify-center">
        <div className="ui-card w-full max-w-md text-center">
          <p className="text-gray-300">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
