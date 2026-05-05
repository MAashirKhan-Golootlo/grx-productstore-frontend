'use client';

import { LoginForm, AuthShell, useAuthRedirect } from '@/features/auth';

export default function LoginPage() {
  useAuthRedirect('/', true);

  return (
    <AuthShell
      title="Welcome back"
      description="Enter your email to sign in to your account"
    >
      <LoginForm />
    </AuthShell>
  );
}
