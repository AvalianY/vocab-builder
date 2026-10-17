import { AuthForm } from '../features/auth/AuthForm';
import { AuthLayout } from '../layouts/AuthLayout';

export function RegisterPage() {
  return (
    <AuthLayout mode="register">
      <AuthForm mode="register" />
    </AuthLayout>
  );
}
