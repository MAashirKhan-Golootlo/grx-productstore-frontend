'use client';

import { useRouter, useParams } from 'next/navigation';
import { UserForm, useUserEditor } from '@/features/users';
import { UserFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { BackButton } from '@/components/common';

export function UserEditPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { user, isLoading, isSubmitting, error, update } = useUserEditor(id);

  const onSubmit = async (data: UserFormData) => {
    try {
      await update(data);
      router.push('/users');
    } catch {
      // Error handled by Redux
    }
  };

  if (isLoading && !user) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <BackButton fallbackHref="/users" />
        <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
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
          {user && (
            <UserForm 
              onSubmit={onSubmit} 
              isLoading={isSubmitting} 
              isEdit={true}
              initialData={{
                name: user.name,
                email: user.email,
                isActive: user.isActive,
              }} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
