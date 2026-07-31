import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { brandApi } from '../api/brand-api';
import type { BrandRequest } from '../types/brand-type';

export const useBrandList = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: brandApi.getAll,
  });
};

export const useBrand = (id: number) => {
  return useQuery({
    queryKey: ['brands', id],
    queryFn: () => brandApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BrandRequest) => brandApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BrandRequest }) => brandApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => brandApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};
