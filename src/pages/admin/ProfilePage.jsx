// PÁGINA ADMIN · Mi perfil = AdminPageTemplate + Alert + UserForm (rol bloqueado)
import { useState } from 'react';
import { userService } from '../../data/dataService';
import { useAuth } from '../../context/AuthContext';
import { Alert } from '../../components/molecules/Alert';
import { UserForm } from '../../components/organisms/UserForm';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const ProfilePage = () => {
  const { user, refresh } = useAuth();
  const [ok, setOk] = useState('');
  const full = userService.getById(user.id) ?? user;

  const handleSubmit = (data, setErrors) => {
    if (userService.emailExists(data.email, user.id)) {
      setErrors({ email: 'Ya existe otro usuario con ese correo.' });
      return;
    }
    refresh(userService.update(user.id, { ...data, rol: full.rol }));
    setOk('Perfil actualizado.');
  };

  return (
    <AdminPageTemplate title="Mi perfil" subtitle="Datos de tu cuenta de administrador" alerts={<Alert message={ok} variant="success" onClose={() => setOk('')} />}>
      <div className="panel"><UserForm initialValues={full} isEdit lockRole onSubmit={handleSubmit} /></div>
    </AdminPageTemplate>
  );
};
