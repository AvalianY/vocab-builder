import { AuthForm } from '../features/auth/AuthForm';
import { AuthLayout } from '../layouts/AuthLayout';

export function LoginPage() {
  return (
    <AuthLayout mode="login">
      <AuthForm mode="login" />
    </AuthLayout>
  );
}
