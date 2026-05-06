'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchTenantById, updateTenant } from '@/redux/slices/tenantSlice';
import { TenantForm } from '@/features/tenants';
import { TenantFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditTenantPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { selected: tenant, isLoading, error } = useAppSelector((state) => state.tenants);

  useEffect(() => {
    if (id) {
      dispatch(fetchTenantById(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (data: TenantFormData) => {
    try {
      await dispatch(updateTenant({ id, data })).unwrap();
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
      <h1 className="text-3xl font-bold tracking-tight">Edit Tenant</h1>

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
              isLoading={isLoading}
              initialData={{ code: tenant.code, name: tenant.name }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
