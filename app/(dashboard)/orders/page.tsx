'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOrders } from '@/redux/slices/orderSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          items.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Order #{order.orderNumber}</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${order.totalAmount}</div>
                <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase">{order.status}</span>
                  <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
