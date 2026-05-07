'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TenantForm, useTenantEditor } from '@/features/tenants';
import { TenantFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { tenantService } from '@/lib/api/tenants/services/tenantService';
import { TenantIntegrationCredentials } from '@/types/tenant';

export function TenantEditPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const tenantId = Number(id);
  const { tenant, isLoading, isSubmitting, error, update } = useTenantEditor(
    Number.isNaN(tenantId) ? undefined : tenantId,
  );
  const [credentials, setCredentials] = useState<TenantIntegrationCredentials | null>(
    null,
  );

  const onSubmit = async (data: TenantFormData) => {
    try {
      await update(data);
      router.push('/tenants');
    } catch {
      // Error handled by redux.
    }
  };

  const copyClientId = async (clientId: number) => {
    await navigator.clipboard.writeText(String(clientId));
  };

  const copyClientSecret = async (clientSecret: string) => {
    await navigator.clipboard.writeText(clientSecret);
  };

  useEffect(() => {
    if (Number.isNaN(tenantId)) return;
    void tenantService
      .getIntegrationCredentials(tenantId)
      .then((result) => setCredentials(result))
      .catch(() => setCredentials(null));
  }, [tenantId]);

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

      {tenant && (
        <Card>
          <CardHeader>
            <CardTitle>Integration Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                Client secret is shown only once at tenant creation time and is not editable here.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Client ID (Read only)</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-muted px-3 py-2 text-sm">{tenant.id}</code>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void copyClientId(tenant.id)}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Client Secret (Read only)</p>
              {credentials ? (
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded bg-muted px-3 py-2 text-sm break-all">
                    {credentials.clientSecret}
                  </code>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void copyClientSecret(credentials.clientSecret)}
                  >
                    Copy
                  </Button>
                </div>
              ) : (
                <code className="block rounded bg-muted px-3 py-2 text-sm">
                  Unable to load client secret.
                </code>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
