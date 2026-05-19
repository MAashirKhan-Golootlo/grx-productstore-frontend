'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { exportOrdersCsv, fetchOrders, setListParams } from '@/redux/slices/orderSlice';
import { tenantService } from '@/lib/api/tenants/services/tenantService';
import { partnerService } from '@/lib/api/partners/services/partnerService';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Eye, Plus, Search, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import type { ListOrdersParams } from '@/types/order';
import type { Partner } from '@/types/partner';
import type { Tenant } from '@/types/tenant';

const ALL_VALUE = 'all';
const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
const ORDER_NO_DEBOUNCE_MS = 400;
const DEFAULT_LIST_PARAMS: ListOrdersParams = { page: 1, limit: 20 };

const formatAmount = (value: number) =>
  Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function OrdersListPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading, isExporting, error, pagination, listParams } = useAppSelector(
    (state) => state.orders,
  );

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [orderNoInput, setOrderNoInput] = useState(listParams.orderNo ?? '');

  const tenantFilter =
    listParams.tenantId != null ? String(listParams.tenantId) : ALL_VALUE;
  const partnerFilter = listParams.partnerId ?? ALL_VALUE;

  const {
    page: listPage,
    limit: listLimit,
    tenantId: listTenantId,
    partnerId: listPartnerId,
    orderNo: listOrderNo,
  } = listParams;

  const hasActiveFilters =
    listTenantId != null || !!listPartnerId || !!(listOrderNo?.trim());

  useEffect(() => {
    dispatch(
      fetchOrders({
        page: listPage,
        limit: listLimit,
        tenantId: listTenantId,
        partnerId: listPartnerId,
        orderNo: listOrderNo,
      }),
    );
  }, [dispatch, listPage, listLimit, listTenantId, listPartnerId, listOrderNo]);

  useEffect(() => {
    setOrderNoInput(listParams.orderNo ?? '');
  }, [listParams.orderNo]);

  useEffect(() => {
    const trimmed = orderNoInput.trim();
    const current = listParams.orderNo?.trim() ?? '';
    if (trimmed === current) return;

    const timer = window.setTimeout(() => {
      dispatch(
        setListParams(
          buildListParams({
            orderNo: trimmed || undefined,
            page: 1,
          }),
        ),
      );
    }, ORDER_NO_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce orderNoInput only
  }, [orderNoInput]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [tenantList, partnerList] = await Promise.all([
          tenantService.getAll(),
          partnerService.getAll(),
        ]);
        if (!cancelled) {
          setTenants(tenantList);
          setPartners(partnerList);
        }
      } finally {
        if (!cancelled) setFiltersLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const buildListParams = (overrides: {
    tenantId?: number;
    partnerId?: string;
    orderNo?: string;
    page?: number;
    limit?: number;
  }): ListOrdersParams => {
    const params: ListOrdersParams = {
      page: overrides.page ?? listParams.page ?? 1,
      limit: overrides.limit ?? listParams.limit ?? 20,
    };
    const tenantId =
      'tenantId' in overrides ? overrides.tenantId : listParams.tenantId;
    const partnerId =
      'partnerId' in overrides ? overrides.partnerId : listParams.partnerId;
    const orderNo = 'orderNo' in overrides ? overrides.orderNo : listParams.orderNo;
    if (tenantId != null) params.tenantId = tenantId;
    if (partnerId) params.partnerId = partnerId;
    if (orderNo?.trim()) params.orderNo = orderNo.trim();
    return params;
  };

  const applyFilters = (next: {
    tenantId?: number;
    partnerId?: string;
    orderNo?: string;
    page?: number;
    limit?: number;
  }) => {
    dispatch(setListParams(buildListParams({ ...next, page: 1 })));
  };

  const handleTenantChange = (value: string) => {
    applyFilters({
      tenantId: value === ALL_VALUE ? undefined : Number(value),
    });
  };

  const handlePartnerChange = (value: string) => {
    applyFilters({
      partnerId: value === ALL_VALUE ? undefined : value,
    });
  };

  const handlePageSizeChange = (value: string) => {
    applyFilters({ limit: Number(value), page: 1 });
  };

  const handlePageChange = (page: number) => {
    dispatch(setListParams(buildListParams({ page })));
  };

  const handleClearFilters = () => {
    setOrderNoInput('');
    dispatch(
      setListParams({
        page: 1,
        limit: listParams.limit ?? DEFAULT_LIST_PARAMS.limit,
      }),
    );
  };

  const handleOrderNoSearch = () => {
    const trimmed = orderNoInput.trim();
    dispatch(
      setListParams(
        buildListParams({
          orderNo: trimmed || undefined,
          page: 1,
        }),
      ),
    );
  };

  const handleExport = () => {
    dispatch(
      exportOrdersCsv({
        tenantId: listParams.tenantId,
        partnerId: listParams.partnerId,
        orderNo: listParams.orderNo,
      }),
    );
  };

  const { page, limit, total, totalPages } = pagination;
  const rangeStart = total === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, total);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleExport}
            disabled={isExporting || isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? 'Exporting…' : 'Export CSV'}
          </Button>
          <Button asChild>
            <Link href="/orders/new">
              <Plus className="mr-2 h-4 w-4" /> Create Order
            </Link>
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="order-no-search">Order #</Label>
              <div className="flex gap-2">
                <Input
                  id="order-no-search"
                  placeholder="Search by order number…"
                  value={orderNoInput}
                  onChange={(e) => setOrderNoInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleOrderNoSearch();
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={handleOrderNoSearch}
                  aria-label="Search orders"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenant-filter">Tenant</Label>
              <Select
                value={tenantFilter}
                onValueChange={handleTenantChange}
                disabled={filtersLoading}
              >
                <SelectTrigger id="tenant-filter">
                  <SelectValue placeholder="All tenants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_VALUE}>All tenants</SelectItem>
                  {tenants.map((tenant) => (
                    <SelectItem key={tenant.id} value={String(tenant.id)}>
                      {tenant.name} ({tenant.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="partner-filter">Partner</Label>
              <Select
                value={partnerFilter}
                onValueChange={handlePartnerChange}
                disabled={filtersLoading}
              >
                <SelectTrigger id="partner-filter">
                  <SelectValue placeholder="All partners" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_VALUE}>All partners</SelectItem>
                  {partners.map((partner) => (
                    <SelectItem key={partner.id} value={partner.id}>
                      {partner.name} ({partner.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="page-size">Rows per page</Label>
              <Select value={String(limit)} onValueChange={handlePageSizeChange}>
                <SelectTrigger id="page-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters || isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Clear filters
            </Button>
            {hasActiveFilters && (
              <span className="text-sm text-muted-foreground">Filters applied</span>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={`order-row-skeleton-${index}`} className="h-10 w-full" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No orders found.
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.tenant?.name ?? order.tenantId}</TableCell>
                      <TableCell>{order.partner?.name ?? order.partnerId}</TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell>PKR {formatAmount(order.totalAmount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{order.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/orders/${order.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {rangeStart}–{rangeEnd} of {total} orders
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={page <= 1 || isLoading}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {Math.max(totalPages, 1)}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages || isLoading || totalPages === 0}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}