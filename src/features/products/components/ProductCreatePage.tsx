'use client';

import { useRouter } from 'next/navigation';
import { ProductForm, useProductEditor } from '@/features/products';
import { ProductFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BackButton } from '@/components/common';

export function ProductCreatePage() {
  const router = useRouter();
  const { categories, isSubmitting, error, create } = useProductEditor();

  const onSubmit = async (data: ProductFormData) => {
    try {
      await create(data);
      router.push('/products');
    } catch {
      // Error handled by Redux
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <BackButton fallbackHref="/products" />
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
      </div>
      
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
          <ProductForm 
            onSubmit={onSubmit} 
            categories={categories} 
            isLoading={isSubmitting} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
