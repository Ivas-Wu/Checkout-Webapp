export type Item = {
  id: number;
  userId: number;
  receiptId: number;
  productName: string;
  category?: string;
  numberOf?: number;
  price: number;
};

export type ItemCreateReq = {
  userId: number;
  receiptId: number;
  productName: string;
  category?: string;
  numberOf?: number;
  price: number;
};

export type ItemUpdateReq = {
  userId?: number;
  receiptId?: number;
  productName?: string;
  category?: string;
  numberOf?: number;
  price?: number;
};
