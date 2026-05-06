'use client';

import { useRouter, useParams } from 'next/navigation';
import { PartnerForm, usePartnerEditor } from '@/features/partners';
import { PartnerFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export function PartnerEditPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { partner, isLoading, isSubmitting, error, update } = usePartnerEditor(id);

  const onSubmit = async (data: PartnerFormData) => {
    try {
      await update(data);
      router.push('/partners');
    } catch {
      // Error handled by redux.
    }
  };

  if (isLoading && !partner) {
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Partner</h1>
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
          {partner && (
            <PartnerForm
              onSubmit={onSubmit}
              isLoading={isSubmitting}
              initialData={{
                code: partner.code,
                name: partner.name,
                contactEmail: partner.contactEmail,
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
