export type Scanner = {
    receipt?: ScannerR,
    items?: ScannerI[],
  };

export type ScannerR = {
    store?: string;
    category?: string;
    total?: number;
    userId: number;
  }

export type ScannerI = {
    productName?: string;
    category?: string;
    price?: number;
    userId: number;
  }