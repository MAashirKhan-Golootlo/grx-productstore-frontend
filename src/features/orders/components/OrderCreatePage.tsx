'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createOrder } from '@/redux/slices/orderSlice';
import { fetchProducts } from '@/redux/slices/productSlice';
import { fetchPartners } from '@/redux/slices/partnerSlice';
import { fetchTenants } from '@/redux/slices/tenantSlice';
import { OrderForm } from '@/features/orders';
import { OrderFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BackButton } from '@/components/common';

export function OrderCreatePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items: products } = useAppSelector((state) => state.products);
  const { items: partners } = useAppSelector((state) => state.partners);
  const { items: tenants } = useAppSelector((state) => state.tenants);
  const { isSubmitting, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchPartners());
    dispatch(fetchTenants());
  }, [dispatch]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      await dispatch(createOrder(data)).unwrap();
      router.push('/orders');
    } catch {
      // Error handled by redux.
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <BackButton fallbackHref="/orders" />
        <h1 className="text-3xl font-bold tracking-tight">Create New Order</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderForm
            onSubmit={onSubmit}
            products={products}
            partners={partners}
            tenants={tenants}
            isLoading={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
