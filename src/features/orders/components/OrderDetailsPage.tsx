'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchOrderById, updateOrderStatus } from '@/redux/slices/orderSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { OrderStatus } from '@/types/order';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

export function OrderDetailsPage() {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { selected: order, isLoading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  const handleStatusChange = async (status: string) => {
    await dispatch(updateOrderStatus({ id, status: status as OrderStatus }));
  };

  if (isLoading && !order) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
            <CardContent><Skeleton className="h-48 w-full" /></CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
            <CardContent><Skeleton className="h-48 w-full" /></CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!order) return <p>Order not found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="-ml-2 w-fit gap-1 px-2" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4" />
              Back to orders
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Order #{order.orderNumber}</h1>
          <p className="text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select onValueChange={handleStatusChange} defaultValue={order.status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(OrderStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                      <span className="text-xs font-bold">IMG</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.product?.name || 'Unknown Product'}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {order.tenant ? (
                <>
                  <div>
                    <p className="font-medium text-muted-foreground">ID</p>
                    <p>{order.tenant.id}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Code</p>
                    <p>{order.tenant.code}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Name</p>
                    <p>{order.tenant.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Status</p>
                    <p>{order.tenant.status}</p>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Tenant ID: {order.tenantId}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {order.partner ? (
                <>
                  <div>
                    <p className="font-medium text-muted-foreground">ID</p>
                    <p className="break-all">{order.partner.id}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Code</p>
                    <p>{order.partner.code}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Name</p>
                    <p>{order.partner.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Contact email</p>
                    <p>{order.partner.contactEmail}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Status</p>
                    <p>{order.partner.status}</p>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Partner ID: {order.partnerId}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer ID</p>
                <p>{order.customerId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p>{order.customerName || order.user?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p>{order.customerPhone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{order.customerEmail || order.user?.email || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress?.trim() || 'N/A'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
