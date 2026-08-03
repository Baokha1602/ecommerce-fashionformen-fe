import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productTagApi } from '../api/product-tag-api';
import type { ProductTagRequest } from '../types/product-tag-type';

export const useProductTagList = () => {
  return useQuery({
    queryKey: ['productTags'],
    queryFn: productTagApi.getAll,
  });
};

export const useProductTag = (id: number) => {
  return useQuery({
    queryKey: ['productTags', id],
    queryFn: () => productTagApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateProductTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductTagRequest) => productTagApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productTags'] });
    },
  });
};

export const useUpdateProductTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductTagRequest }) => productTagApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productTags'] });
    },
  });
};

export const useDeleteProductTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productTagApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productTags'] });
    },
  });
};
