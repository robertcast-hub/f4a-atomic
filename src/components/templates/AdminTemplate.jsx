// TEMPLATE · AdminTemplate = AdminSidebar + barra superior + zona de contenido (Outlet)
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminSidebar } from '../organisms/AdminSidebar';

export const AdminTemplate = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-shell">
      <AdminSidebar onLogout={handleLogout} />
      <div className="admin-shell__content">
        <div className="admin-shell__topbar">Sesión: <strong>{user?.email}</strong></div>
        <main className="admin-shell__main"><Outlet /></main>
      </div>
    </div>
  );
};
