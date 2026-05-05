'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCategoryById, updateCategory } from '@/redux/slices/categorySlice';
import { CategoryForm } from '@/features/categories';
import { CategoryFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { selected: category, isLoading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await dispatch(updateCategory({ id, data })).unwrap();
      router.push('/categories');
    } catch (err) {
      // Error handled by Redux
    }
  };

  if (isLoading && !category) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          {category && (
            <CategoryForm 
              onSubmit={onSubmit} 
              isLoading={isLoading} 
              initialData={{
                name: category.name,
                slug: category.slug,
                description: category.description,
                isActive: category.isActive,
              }} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
