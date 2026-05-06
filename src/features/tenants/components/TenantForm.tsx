'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TenantFormData, tenantSchema } from '@/lib/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TenantFormProps {
  onSubmit: (data: TenantFormData) => void;
  initialData?: Partial<TenantFormData>;
  isLoading?: boolean;
}

export function TenantForm({ onSubmit, initialData, isLoading }: TenantFormProps) {
  const form = useForm<TenantFormData>({
    resolver: yupResolver(tenantSchema) as any,
    defaultValues: {
      code: initialData?.code || '',
      name: initialData?.name || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="wallet_a" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Wallet A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Tenant'}
        </Button>
      </form>
    </Form>
  );
}
