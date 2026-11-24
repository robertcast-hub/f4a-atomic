// PÁGINA ADMIN · Usuarios = AdminPageTemplate + Alert + DataTable
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../data/dataService';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/atoms/Badge';
import { Button } from '../../components/atoms/Button';
import { Alert } from '../../components/molecules/Alert';
import { DataTable } from '../../components/organisms/DataTable';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const UsersAdminPage = () => {
  const { user: current } = useAuth();
  const [users, setUsers] = useState(() => userService.getAll());
  const [mensaje, setMensaje] = useState('');

  const handleDelete = (u) => {
    if (!window.confirm(`¿Eliminar la cuenta de ${u.email}?`)) return;
    userService.remove(u.id);
    setUsers(userService.getAll());
    setMensaje(`Usuario ${u.email} eliminado.`);
  };

  return (
    <AdminPageTemplate title="Usuarios" subtitle={`${users.length} cuentas registradas`}
      actions={<Link to="/admin/usuarios/nuevo" className="btn btn-sm btn-primary">Nuevo usuario</Link>}
      alerts={<Alert message={mensaje} variant="success" onClose={() => setMensaje('')} />}>
      <DataTable rows={users} columns={[
        { key: 'run', header: 'RUN', render: (u) => <span className="text-nowrap">{u.run}</span> },
        { key: 'nombre', header: 'Nombre', render: (u) => `${u.nombre} ${u.apellidos}` },
        { key: 'email', header: 'Correo' },
        { key: 'rol', header: 'Rol', render: (u) => <Badge tone={u.rol === 'admin' ? 'warning' : 'neutral'}>{u.rol}</Badge> },
        { key: 'acc', header: 'Acciones', align: 'end', render: (u) => (
          <span className="text-nowrap">
            <Link to={`/admin/usuarios/${u.id}`} className="btn btn-sm btn-ghost me-1">Ver</Link>
            <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm btn-ghost me-1">Editar</Link>
            <Button variant="danger-ghost" size="sm" label="Eliminar" disabled={u.id === current?.id}
              title={u.id === current?.id ? 'No puedes eliminar tu propia cuenta' : undefined} onClick={() => handleDelete(u)} />
          </span>
        ) },
      ]} />
    </AdminPageTemplate>
  );
};
