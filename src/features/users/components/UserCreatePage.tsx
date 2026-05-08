'use client';

import { useRouter } from 'next/navigation';
import { UserForm, useUserEditor } from '@/features/users';
import { UserFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BackButton } from '@/components/common';

export function UserCreatePage() {
  const router = useRouter();
  const { create, isSubmitting, error } = useUserEditor();

  const onSubmit = async (data: UserFormData) => {
    try {
      await create(data);
      router.push('/users');
    } catch {
      // Error handled by Redux
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <BackButton fallbackHref="/users" />
        <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm onSubmit={onSubmit} isLoading={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
