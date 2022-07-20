export type User = {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  familySize?: number;
  active: Boolean;
};

export type UserCreateReq = {
  firstName?: string;
  lastName?: string;
  email: string;
  familySize?: number;
  active?: Boolean;
};

export type UserUpdateReq = {
  firstName?: string;
  lastName?: string;
  email?: string;
  familySize?: number;
  active?: Boolean;
};
