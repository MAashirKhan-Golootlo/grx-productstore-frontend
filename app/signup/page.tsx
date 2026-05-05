'use client';

import { SignupForm, AuthShell, useAuthRedirect } from '@/features/auth';

export default function SignupPage() {
  useAuthRedirect('/', true);

  return (
    <AuthShell
      title="Create an account"
      description="Enter your details to create your account"
    >
      <SignupForm />
    </AuthShell>
  );
}
