export type Target = {
  id: number;
  userId: number;
  category: string;
  value: number;
};

export type TargetTotal = {
  total: number;
};

export type TargetCreateReq = {
  userId: number;
  category: string;
  value: number;
};

export type TargetUpdateReq = {
  userId: number;
  category: string;
  value: number;
};
