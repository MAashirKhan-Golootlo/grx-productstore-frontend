'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TenantForm, useTenantEditor } from '@/features/tenants';
import { TenantFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CreateTenantResponse } from '@/types/tenant';

export function TenantCreatePage() {
  const router = useRouter();
  const { create, isSubmitting, error } = useTenantEditor();
  const [created, setCreated] = useState<CreateTenantResponse | null>(null);
  const [copiedField, setCopiedField] = useState<'clientId' | 'clientSecret' | null>(
    null,
  );

  const onSubmit = async (data: TenantFormData) => {
    try {
      const result = await create(data);
      setCreated(result);
    } catch {
      // Error handled by redux.
    }
  };

  const copyValue = async (field: 'clientId' | 'clientSecret', value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField((current) => (current === field ? null : current)), 1500);
  };

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
        <h1 className="text-3xl font-bold tracking-tight">Create New Tenant</h1>
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
          <TenantForm onSubmit={onSubmit} isLoading={isSubmitting || !!created} />
        </CardContent>
      </Card>

      {created && (
        <Card className="border-primary/40">
          <CardHeader>
            <CardTitle>Integration Credentials (Save Now)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                Client secret is shown only once. Copy and store it securely before leaving this page.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Client ID</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-muted px-3 py-2 text-sm">
                  {created.integrationCredentials.clientId}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    void copyValue(
                      'clientId',
                      String(created.integrationCredentials.clientId),
                    )
                  }
                >
                  {copiedField === 'clientId' ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Client Secret</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-muted px-3 py-2 text-sm break-all">
                  {created.integrationCredentials.clientSecret}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    void copyValue(
                      'clientSecret',
                      created.integrationCredentials.clientSecret,
                    )
                  }
                >
                  {copiedField === 'clientSecret' ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={() => router.push('/tenants')}>
                I Saved Credentials
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
