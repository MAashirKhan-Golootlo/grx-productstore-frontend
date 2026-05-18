'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema, type CategoryFormData } from '@/lib/validation';
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
import { uploadService } from '@/lib/api/uploads/services/uploadService';

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => void;
  initialData?: Partial<CategoryFormData>;
  isLoading?: boolean;
}

function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function CategoryForm({ onSubmit, initialData, isLoading }: CategoryFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl ?? null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<CategoryFormData>({
    resolver: yupResolver(categorySchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      imageUrl: initialData?.imageUrl || '',
    },
  });

  const nameValue = form.watch('name');

  useEffect(() => {
    const nextSlug = toSlug(nameValue || '');
    const initialNameSlug = toSlug(initialData?.name || '');
    const currentSlug = form.getValues('slug');

    if (!initialData?.slug || currentSlug === initialNameSlug || currentSlug === '') {
      form.setValue('slug', nextSlug, { shouldValidate: true });
    }
  }, [form, initialData?.name, initialData?.slug, nameValue]);

  const handleFormSubmit = async (data: CategoryFormData) => {
    try {
      setUploadError(null);
      let imageUrl = data.imageUrl;

      if (imageFile) {
        const uploaded = await uploadService.uploadImage(imageFile);
        imageUrl = uploaded.url;
      }

      await onSubmit({ ...data, imageUrl });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setUploadError(error.response.data.message);
      } else {
        setUploadError('Failed to upload image. Please try again.');
      }
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Electronics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="slug" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Category Image</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                setImageFile(file);
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setImagePreview(initialData?.imageUrl ?? null);
                }
              }}
            />
          </FormControl>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Category preview"
              className="mt-2 h-24 w-24 rounded-md border object-cover"
            />
          )}
          {uploadError && <FormMessage>{uploadError}</FormMessage>}
        </FormItem>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Category'}
        </Button>
      </form>
    </Form>
  );
}
