import { UidType } from '@/types';
export type StocksIdType = UidType;
export type StockListType = {
  id: string;
  stockQuantity: number;
  stockReferenceUrl: string | null;
};