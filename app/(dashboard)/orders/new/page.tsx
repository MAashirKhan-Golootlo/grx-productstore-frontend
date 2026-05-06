'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createOrder } from '@/redux/slices/orderSlice';
import { fetchProducts } from '@/redux/slices/productSlice';
import { OrderForm } from '@/features/orders';
import { OrderFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function NewOrderPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items: products } = useAppSelector((state) => state.products);
  const { isSubmitting, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchProducts());
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
      <h1 className="text-3xl font-bold tracking-tight">Create New Order</h1>

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
          <OrderForm onSubmit={onSubmit} products={products} isLoading={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
