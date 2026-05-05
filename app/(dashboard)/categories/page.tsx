'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCategories } from '@/redux/slices/categorySlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CategoriesPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          items.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{category.description || 'No description'}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-muted-foreground">{category.productCount || 0} Products</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
