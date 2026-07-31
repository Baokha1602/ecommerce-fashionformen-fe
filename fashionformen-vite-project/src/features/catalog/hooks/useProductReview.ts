import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productReviewApi } from '../api/product-review-api';
import type { ProductReviewRequest } from '../types/product-review-type';

export const useProductReviewList = () => {
  return useQuery({
    queryKey: ['productReviews'],
    queryFn: productReviewApi.getAll,
  });
};

export const useProductReview = (id: number) => {
  return useQuery({
    queryKey: ['productReviews', id],
    queryFn: () => productReviewApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateProductReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductReviewRequest) => productReviewApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productReviews'] });
    },
  });
};

export const useUpdateProductReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductReviewRequest }) => productReviewApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productReviews'] });
    },
  });
};

export const useDeleteProductReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productReviewApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productReviews'] });
    },
  });
};
