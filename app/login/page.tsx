'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm, AuthShell, useAuthRedirect } from '@/features/auth';

function LoginRedirectGate() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next');
  const redirectTo = nextPath && nextPath.startsWith('/') ? nextPath : '/';
  useAuthRedirect(redirectTo, true);
  return null;
}

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Enter your email to sign in to your account"
    >
      <Suspense fallback={null}>
        <LoginRedirectGate />
      </Suspense>
      <LoginForm />
    </AuthShell>
  );
}
