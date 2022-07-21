export type User = {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  familySize?: number;
  active: boolean;
};

export type UserCreateReq = {
  firstName?: string;
  lastName?: string;
  email: string;
  familySize?: number;
  active?: boolean;
};

export type UserUpdateReq = {
  firstName?: string;
  lastName?: string;
  email?: string;
  familySize?: number;
  active?: boolean;
};
