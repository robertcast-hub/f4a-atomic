// PÁGINA · Iniciar sesión = FocusTemplate + 2 FormField + Button
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validators';
import { Heading } from '../../components/atoms/Heading';
import { Button } from '../../components/atoms/Button';
import { ErrorMessage } from '../../components/molecules/Alert';
import { FormField } from '../../components/molecules/FormField';
import { FocusTemplate } from '../../components/templates/FocusTemplate';

export const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  if (user) return <Navigate to={user.rol === 'admin' ? '/admin' : '/'} replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(form.email) || !form.password) {
      setError('Ingresa un correo válido y tu contraseña.');
      return;
    }
    const result = login(form.email, form.password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(location.state?.from ?? (result.user.rol === 'admin' ? '/admin' : '/'), { replace: true });
  };

  return (
    <FocusTemplate width="sm">
      <Heading level={1} size={3}>Iniciar sesión</Heading>
      <ErrorMessage error={error} onClose={() => setError('')} />
      <form noValidate onSubmit={handleSubmit} className="row g-3">
        <FormField label="Correo" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />
        <FormField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} autoComplete="current-password" />
        <div className="col-12"><Button type="submit" label="Ingresar" block /></div>
      </form>
      <p className="small mt-3 mb-1">¿No tienes cuenta? <Link to="/registro">Crea una aquí</Link></p>
      <p className="small text-muted-f4a mb-0">Demo: admin@f4a.cl / admin123 · cliente@f4a.cl / cliente123</p>
    </FocusTemplate>
  );
};
