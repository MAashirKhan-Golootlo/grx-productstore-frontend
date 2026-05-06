'use client';

import { useRouter, useParams } from 'next/navigation';
import { ProductForm, useProductEditor } from '@/features/products';
import { ProductFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { product, categories, isLoading, isSubmitting, error, update } = useProductEditor(id);

  const onSubmit = async (data: ProductFormData) => {
    try {
      await update(data);
      router.push('/products');
    } catch {
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
              isLoading={isSubmitting} 
              initialData={{
                name: product.name,
                sku: product.sku,
                price: product.price,
                currency: product.currency,
                categoryId: product.categoryId,
                description: product.description,
              }} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
