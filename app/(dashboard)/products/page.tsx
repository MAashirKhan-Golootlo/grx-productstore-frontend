'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProducts } from '@/redux/slices/productSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          items.map((product) => (
            <Card key={product.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${product.price}</div>
                <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs">Stock: {product.stock}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
