'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchPartnerById, updatePartner } from '@/redux/slices/partnerSlice';
import { PartnerForm } from '@/features/partners';
import { PartnerFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditPartnerPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { selected: partner, isLoading, error } = useAppSelector((state) => state.partners);

  useEffect(() => {
    if (id) {
      dispatch(fetchPartnerById(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (data: PartnerFormData) => {
    try {
      await dispatch(updatePartner({ id, data })).unwrap();
      router.push('/partners');
    } catch {
      // Error handled by redux.
    }
  };

  if (isLoading && !partner) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-10 w-52" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Partner</h1>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Partner Details</CardTitle>
        </CardHeader>
        <CardContent>
          {partner && (
            <PartnerForm
              onSubmit={onSubmit}
              isLoading={isLoading}
              initialData={{
                code: partner.code,
                name: partner.name,
                contactEmail: partner.contactEmail,
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
