import { GhnAddressControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';

export const ghnApiInstance = new GhnAddressControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const extractGhnList = (res: any): any[] => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  
  const body = res.data ?? res;
  if (Array.isArray(body)) return body;

  if (body && typeof body === 'object') {
    if (Array.isArray(body.data)) return body.data;
    if (Array.isArray(body.content)) return body.content;
    if (Array.isArray(body.items)) return body.items;

    if (body.data && typeof body.data === 'object') {
      if (Array.isArray(body.data.data)) return body.data.data;
      if (Array.isArray(body.data.content)) return body.data.content;
      if (Array.isArray(body.data.items)) return body.data.items;
    }
  }
  return [];
};

export const ghnApi = {
  getProvinces: async (): Promise<any[]> => {
    const res = await ghnApiInstance.getProvinces();
    return extractGhnList(res);
  },

  getDistricts: async (provinceId: number): Promise<any[]> => {
    const res = await ghnApiInstance.getDistricts(provinceId);
    return extractGhnList(res);
  },

  getWards: async (districtId: number): Promise<any[]> => {
    const res = await ghnApiInstance.getWards(districtId);
    return extractGhnList(res);
  },
};
