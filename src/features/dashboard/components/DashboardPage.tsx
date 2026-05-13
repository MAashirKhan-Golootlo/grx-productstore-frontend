'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCategories } from '@/redux/slices/categorySlice';
import { fetchProducts } from '@/redux/slices/productSlice';
import { fetchUsers } from '@/redux/slices/userSlice';
import { fetchOrders } from '@/redux/slices/orderSlice';
import { useAuthRedirect } from "@/features/auth";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Package, 
  Tag, 
  Users, 
  ShoppingCart, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function DashboardPage() {
  useAuthRedirect('/login', false);
  const dispatch = useAppDispatch();

  const { items: categories } = useAppSelector((state) => state.categories);
  const { items: products } = useAppSelector((state) => state.products);
  const { items: users } = useAppSelector((state) => state.users);
  const { items: orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      description: 'Active items in store',
      color: 'text-blue-600',
    },
    {
      title: 'Categories',
      value: categories.length,
      icon: Tag,
      description: 'Product groupings',
      color: 'text-purple-600',
    },
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      description: 'Registered accounts',
      color: 'text-green-600',
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      description: 'Processed transactions',
      color: 'text-orange-600',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store performance and activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString('en-US')}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You have {orders.length.toLocaleString('en-US')} total orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Order #{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.status} • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+PKR {Number(order.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent orders found.</p>
              )}
            </div>
            {recentOrders.length > 0 && (
              <Button variant="outline" className="w-full mt-6" asChild>
                <Link href="/orders">
                  View All Orders <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used management tasks.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/products">
                <Plus className="mr-2 h-4 w-4" /> Add New Product
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/categories">
                <Plus className="mr-2 h-4 w-4" /> Create Category
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/users">
                <Users className="mr-2 h-4 w-4" /> Manage Users
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
