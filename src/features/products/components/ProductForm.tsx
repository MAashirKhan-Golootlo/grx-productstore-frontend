'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema, type ProductFormData } from '@/lib/validation';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/types/category';
import { uploadService } from '@/lib/api/uploads/services/uploadService';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<unknown> | unknown;
  categories: Category[];
  initialData?: Partial<ProductFormData>;
  isLoading?: boolean;
}

export function ProductForm({ onSubmit, categories, initialData, isLoading }: ProductFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl ?? null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    resolver: yupResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      sku: initialData?.sku || '',
      price: initialData?.price || 0,
      currency: initialData?.currency || 'PKR',
      categoryId: initialData?.categoryId || '',
      description: initialData?.description || '',
      imageUrl: initialData?.imageUrl || '',
    },
  });

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      setUploadError(null);
      let imageUrl = data.imageUrl;

      if (imageFile) {
        const uploaded = await uploadService.uploadImage(imageFile);
        imageUrl = uploaded.url;
      }

      await onSubmit({
        ...data,
        imageUrl,
      });
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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="iPhone 15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input placeholder="IPH15-BLK-128" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="999.99" 
                    {...field} 
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === '' ? '' : Number(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PKR">PKR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="AED">AED</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product details..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Product Image</FormLabel>
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
              alt="Product preview"
              className="mt-2 h-24 w-24 rounded-md border object-cover"
            />
          )}
          {uploadError && <FormMessage>{uploadError}</FormMessage>}
        </FormItem>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Product'}
        </Button>
      </form>
    </Form>
  );
}
