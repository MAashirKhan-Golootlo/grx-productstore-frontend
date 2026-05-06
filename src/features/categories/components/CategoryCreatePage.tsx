'use client';

import { useRouter } from 'next/navigation';
import { CategoryForm, useCategoryEditor } from '@/features/categories';
import { CategoryFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function CategoryCreatePage() {
  const router = useRouter();
  const { create, isSubmitting, error } = useCategoryEditor();

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await create(data);
      router.push('/categories');
    } catch {
      // Error handled by Redux
    }
  };

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
        <h1 className="text-3xl font-bold tracking-tight">Add New Category</h1>
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
          <CategoryForm onSubmit={onSubmit} isLoading={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
