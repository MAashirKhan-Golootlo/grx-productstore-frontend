'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProductById, updateProduct } from '@/redux/slices/productSlice';
import { fetchCategories } from '@/redux/slices/categorySlice';
import { ProductForm } from '@/features/products';
import { ProductFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  
  const { selected: product, isLoading, error } = useAppSelector((state) => state.products);
  const { items: categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      dispatch(fetchCategories());
    }
  }, [dispatch, id]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      await dispatch(updateProduct({ id, data })).unwrap();
      router.push('/products');
    } catch (err) {
      // Error handled by Redux
    }
  };

  if (isLoading && !product) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          {product && (
            <ProductForm 
              onSubmit={onSubmit} 
              categories={categories}
              isLoading={isLoading} 
              initialData={{
                name: product.name,
                sku: product.sku,
                price: product.price,
                stock: product.stock,
                categoryId: product.categoryId,
                description: product.description,
                isActive: product.isActive,
              }} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
