'use client';

import { useRouter, useParams } from 'next/navigation';
import { TenantForm, useTenantEditor } from '@/features/tenants';
import { TenantFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export function TenantEditPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { tenant, isLoading, isSubmitting, error, update } = useTenantEditor(id);

  const onSubmit = async (data: TenantFormData) => {
    try {
      await update(data);
      router.push('/tenants');
    } catch {
      // Error handled by redux.
    }
  };

  if (isLoading && !tenant) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-10 w-52" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
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
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Tenant</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tenant Details</CardTitle>
        </CardHeader>
        <CardContent>
          {tenant && (
            <TenantForm
              onSubmit={onSubmit}
              isLoading={isSubmitting}
              initialData={{ code: tenant.code, name: tenant.name }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
