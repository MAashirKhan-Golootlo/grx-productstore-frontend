'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  fetchPartnerProductById,
  updatePartnerProduct,
} from '@/redux/slices/partnerProductSlice';
import { fetchPartners } from '@/redux/slices/partnerSlice';
import { fetchProducts } from '@/redux/slices/productSlice';
import { fetchTenants } from '@/redux/slices/tenantSlice';
import { PartnerProductForm } from '@/features/partner-products';
import { PartnerProductFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditPartnerProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();

  const {
    selected: partnerProduct,
    isLoading,
    error,
  } = useAppSelector((state) => state.partnerProducts);
  const { items: partners } = useAppSelector((state) => state.partners);
  const { items: products } = useAppSelector((state) => state.products);
  const { items: tenants } = useAppSelector((state) => state.tenants);

  useEffect(() => {
    if (id) {
      dispatch(fetchPartnerProductById(id));
    }
    dispatch(fetchPartners());
    dispatch(fetchProducts());
    dispatch(fetchTenants());
  }, [dispatch, id]);

  const onSubmit = async (data: PartnerProductFormData) => {
    try {
      const payload = {
        ...data,
        tenantId:
          !data.tenantId || data.tenantId === '__none__' ? undefined : data.tenantId,
      };
      await dispatch(updatePartnerProduct({ id, data: payload })).unwrap();
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
      <h1 className="text-3xl font-bold tracking-tight">Edit Partner Product</h1>

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
              isLoading={isLoading}
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
