'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchPartnerProducts } from '@/redux/slices/partnerProductSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function PartnerProductsListPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.partnerProducts);

  useEffect(() => {
    dispatch(fetchPartnerProducts());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Partner Products</h1>
        <Button asChild>
          <Link href="/partner-products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Mapping
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
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={`partner-product-row-skeleton-${index}`} className="h-10 w-full" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No partner product mappings found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Partner Price</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((mapping) => (
                  <TableRow key={mapping.id}>
                    <TableCell className="font-medium">
                      {mapping.partner?.name || mapping.partnerId}
                    </TableCell>
                    <TableCell>{mapping.product?.name || mapping.productId}</TableCell>
                    <TableCell>{mapping.tenant?.name || '-'}</TableCell>
                    <TableCell>
                      {mapping.availableStock.toLocaleString('en-US')} / {mapping.allocatedStock.toLocaleString('en-US')}
                    </TableCell>
                    <TableCell>
                      {mapping.currency}{' '}
                      {Number(mapping.partnerPrice).toLocaleString('en-US')}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/partner-products/${mapping.id}/edit`}>
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
