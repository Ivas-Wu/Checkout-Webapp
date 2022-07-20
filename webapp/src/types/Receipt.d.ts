export type Receipt = {
  id: number;
  userId: number;
  store?: string;
  total: number;
  category?: string;
  date?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ReceiptCreateReq = {
  userId: number;
  store?: string;
  total: Number;
  category?: string;
  date?: Date;
};

export type ReceiptUpdateReq = {
  userId?: number;
  store?: string;
  total?: number;
  category?: string;
  date?: Date;
};
