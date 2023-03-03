export type Target = {
  id: number;
  userId: number;
  category: string;
  value: number;
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
