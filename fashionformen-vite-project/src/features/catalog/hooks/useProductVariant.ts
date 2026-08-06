import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productVariantApi } from '../api/product-variant-api';
import type { ProductVariantRequest } from '../types/product-variant-type';

export const useProductVariantList = () => {
  return useQuery({
    queryKey: ['productVariants'],
    queryFn: productVariantApi.getAll,
  });
};

export const useProductVariant = (id: number) => {
  return useQuery({
    queryKey: ['productVariants', id],
    queryFn: () => productVariantApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateProductVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductVariantRequest) => productVariantApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productVariants'] });
    },
  });
};

export const useUpdateProductVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductVariantRequest }) => productVariantApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productVariants'] });
    },
  });
};

export const useDeleteProductVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productVariantApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productVariants'] });
    },
  });
};
