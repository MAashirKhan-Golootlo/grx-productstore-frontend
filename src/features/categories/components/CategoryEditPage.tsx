'use client';

import { useRouter, useParams } from 'next/navigation';
import { CategoryForm, useCategoryEditor } from '@/features/categories';
import { CategoryFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export function CategoryEditPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { category, isLoading, isSubmitting, error, update } = useCategoryEditor(id);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await update(data);
      router.push('/categories');
    } catch {
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
      </div>
      
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
              isLoading={isSubmitting} 
              initialData={{
                name: category.name,
                slug: category.slug,
              }} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
