'use client';

import { SignupForm, AuthShell, useAuthRedirect } from '@/features/auth';
import { useSearchParams } from 'next/navigation';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next');
  const redirectTo = nextPath && nextPath.startsWith('/') ? nextPath : '/';
  useAuthRedirect(redirectTo, true);

  return (
    <AuthShell
      title="Create an account"
      description="Enter your details to create your account"
    >
      <SignupForm />
    </AuthShell>
  );
}
