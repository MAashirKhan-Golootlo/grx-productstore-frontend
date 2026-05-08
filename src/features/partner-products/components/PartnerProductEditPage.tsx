'use client';

import { useRouter, useParams } from 'next/navigation';
import { PartnerProductForm, usePartnerProductEditor } from '@/features/partner-products';
import { PartnerProductFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { BackButton } from '@/components/common';

export function PartnerProductEditPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { 
    partnerProduct, 
    partners, 
    products, 
    tenants, 
    isLoading, 
    isSubmitting, 
    error, 
    update 
  } = usePartnerProductEditor(id);

  const onSubmit = async (data: PartnerProductFormData) => {
    try {
      await update(data);
      router.push('/partner-products');
    } catch {
      // Error handled by redux.
    }
  };

  if (isLoading && !partnerProduct) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-10 w-60" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <BackButton fallbackHref="/partner-products" />
        <h1 className="text-3xl font-bold tracking-tight">Edit Partner Product</h1>
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
          {partnerProduct && (
            <PartnerProductForm
              onSubmit={onSubmit}
              partners={partners}
              products={products}
              tenants={tenants}
              isLoading={isSubmitting}
              initialData={{
                partnerId: partnerProduct.partnerId,
                productId: partnerProduct.productId,
                tenantId: partnerProduct.tenantId,
                allocatedStock: partnerProduct.allocatedStock,
                partnerPrice: Number(partnerProduct.partnerPrice),
                currency: partnerProduct.currency,
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
