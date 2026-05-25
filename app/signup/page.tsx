'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SignupForm, AuthShell, useAuthRedirect } from '@/features/auth';

function SignupRedirectGate() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next');
  const redirectTo = nextPath && nextPath.startsWith('/') ? nextPath : '/';
  useAuthRedirect(redirectTo, true);
  return null;
}

export default function SignupPage() {
  return (
    <AuthShell
      title="Create an account"
      description="Enter your details to create your account"
    >
      <Suspense fallback={null}>
        <SignupRedirectGate />
      </Suspense>
      <SignupForm />
    </AuthShell>
  );
}
