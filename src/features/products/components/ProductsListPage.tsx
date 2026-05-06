'use client';

import { useProductsList } from '@/features/products';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Edit } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

const formatPrice = (value?: number) =>
  Number(value ?? 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const getProductImages = (product: { imageUrl?: string; images?: (string | undefined)[] }) => {
  const collected = [product.imageUrl, ...(product.images || [])].filter(
    (image): image is string => Boolean(image)
  );
  return Array.from(new Set(collected));
};

export function ProductsListPage() {
  const { items, isLoading, error } = useProductsList();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Button asChild>
          <Link href="/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={`product-row-skeleton-${index}`} className="h-10 w-full" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No products found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Images</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {getProductImages(product).length > 0 ? (
                        <div className="flex items-center gap-1">
                          {getProductImages(product)
                            .slice(0, 3)
                            .map((imageUrl, index) => (
                              <img
                                key={`${product.id}-image-${index}`}
                                src={imageUrl}
                                alt={`${product.name} ${index + 1}`}
                                className="h-8 w-8 rounded object-cover border"
                              />
                            ))}
                          {getProductImages(product).length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{getProductImages(product).length - 3}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">No image</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                      {product.currency} {formatPrice(product.price)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === 'active' ? 'secondary' : 'outline'}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
