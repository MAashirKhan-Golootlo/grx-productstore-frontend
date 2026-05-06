'use client';

import { LoginForm, AuthShell, useAuthRedirect } from '@/features/auth';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next');
  const redirectTo = nextPath && nextPath.startsWith('/') ? nextPath : '/';
  useAuthRedirect(redirectTo, true);

  return (
    <AuthShell
      title="Welcome back"
      description="Enter your email to sign in to your account"
    >
      <LoginForm />
    </AuthShell>
  );
}
