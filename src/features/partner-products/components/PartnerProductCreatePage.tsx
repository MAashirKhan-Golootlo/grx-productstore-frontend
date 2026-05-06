'use client';

import { useRouter } from 'next/navigation';
import { PartnerProductForm, usePartnerProductEditor } from '@/features/partner-products';
import { PartnerProductFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function PartnerProductCreatePage() {
  const router = useRouter();
  const { partners, products, tenants, isSubmitting, error, create } = usePartnerProductEditor();

  const onSubmit = async (data: PartnerProductFormData) => {
    try {
      await create(data);
      router.push('/partner-products');
    } catch {
      // Error handled by redux.
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Create Partner Product</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Mapping Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PartnerProductForm
            onSubmit={onSubmit}
            partners={partners}
            products={products}
            tenants={tenants}
            isLoading={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
