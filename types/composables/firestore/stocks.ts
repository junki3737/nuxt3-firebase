import { UidType } from '@/types';
export type StocksIdType = UidType;
export type StockCollectionsType = {
  id: string;
  commodityName: string | null;
  quantity: number;
  referenceUrl: string | null;
  tag: Array<string> | [];
  memo: string | null;
};
export type StockCollectionsAddType = {
  commodityName: string | null;
  quantity: number;
  referenceUrl: string | null;
  tag: Array<string> | [];
  memo: string | null;
};
