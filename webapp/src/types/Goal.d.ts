export type Goal = {
  id: number;
  userId: number;
  goalName: string;
  goalDesc?: string;
  targetDate?: Date;
  completed: Boolean;
};

export type GoalCreateReq = {
  userId: number;
  goalName: string;
  goalDesc?: string;
  targetDate?: Date;
  completed?: Boolean;
};

export type GoalUpdateReq = {
  goalName?: string;
  goalDesc?: string;
  targetDate?: Date;
  completed?: Boolean;
};
