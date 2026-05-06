'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createPartner } from '@/redux/slices/partnerSlice';
import { PartnerForm } from '@/features/partners';
import { PartnerFormData } from '@/lib/validation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function NewPartnerPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.partners);

  const onSubmit = async (data: PartnerFormData) => {
    try {
      await dispatch(createPartner(data)).unwrap();
      router.push('/partners');
    } catch {
      // Error handled by redux.
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create New Partner</h1>

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
          <PartnerForm onSubmit={onSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
