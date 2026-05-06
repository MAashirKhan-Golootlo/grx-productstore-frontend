'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createPartnerProduct } from '@/redux/slices/partnerProductSlice';
import { fetchPartners } from '@/redux/slices/partnerSlice';
import { fetchProducts } from '@/redux/slices/productSlice';
import { fetchTenants } from '@/redux/slices/tenantSlice';
import { PartnerProductForm } from '@/features/partner-products';
import { PartnerProductFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function NewPartnerProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.partnerProducts);
  const { items: partners } = useAppSelector((state) => state.partners);
  const { items: products } = useAppSelector((state) => state.products);
  const { items: tenants } = useAppSelector((state) => state.tenants);

  useEffect(() => {
    dispatch(fetchPartners());
    dispatch(fetchProducts());
    dispatch(fetchTenants());
  }, [dispatch]);

  const onSubmit = async (data: PartnerProductFormData) => {
    try {
      const payload = {
        ...data,
        tenantId:
          !data.tenantId || data.tenantId === '__none__' ? undefined : data.tenantId,
      };
      await dispatch(createPartnerProduct(payload)).unwrap();
      router.push('/partner-products');
    } catch {
      // Error handled by redux.
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create Partner Product</h1>

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
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
