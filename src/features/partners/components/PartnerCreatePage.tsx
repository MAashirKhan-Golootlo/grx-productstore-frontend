'use client';

import { useRouter } from 'next/navigation';
import { PartnerForm, usePartnerEditor } from '@/features/partners';
import { PartnerFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function PartnerCreatePage() {
  const router = useRouter();
  const { create, isSubmitting, error } = usePartnerEditor();

  const onSubmit = async (data: PartnerFormData) => {
    try {
      await create(data);
      router.push('/partners');
    } catch {
      // Error handled by redux.
    }
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
        <h1 className="text-3xl font-bold tracking-tight">Create New Partner</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Partner Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PartnerForm onSubmit={onSubmit} isLoading={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
