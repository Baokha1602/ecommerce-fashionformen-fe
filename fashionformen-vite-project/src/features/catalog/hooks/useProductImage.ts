import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productImageApi } from '../api/product-image-api';
import type { ProductImageRequest } from '../types/product-image-type';

export const useProductImageList = () => {
  return useQuery({
    queryKey: ['productImages'],
    queryFn: productImageApi.getAll,
  });
};

export const useProductImage = (id: number) => {
  return useQuery({
    queryKey: ['productImages', id],
    queryFn: () => productImageApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductImageRequest) => productImageApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productImages'] });
    },
  });
};

export const useUpdateProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductImageRequest }) => productImageApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productImages'] });
    },
  });
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productImageApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productImages'] });
    },
  });
};
