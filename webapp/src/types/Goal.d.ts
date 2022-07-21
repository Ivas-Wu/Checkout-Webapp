export type Goal = {
  id: number;
  userId: number;
  goalName: string;
  goalDesc?: string;
  targetDate?: Date;
  completed: boolean;
};

export type GoalCreateReq = {
  userId: number;
  goalName: string;
  goalDesc?: string;
  targetDate?: Date;
  completed?: boolean;
};

export type GoalUpdateReq = {
  goalName?: string;
  goalDesc?: string;
  targetDate?: Date;
  completed?: boolean;
};
