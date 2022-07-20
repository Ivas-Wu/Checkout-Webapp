export type Goal = {
  id: Number;
  userId: Number;
  goalName: String;
  goalDesc?: String;
  targetDate?: Date;
  completed: Boolean;
};

export type GoalCreateReq = {
  userId: Number;
  goalName: String;
  goalDesc?: String;
  targetDate?: Date;
  completed?: Boolean;
};

export type GoalUpdateReq = {
  goalName?: String;
  goalDesc?: String;
  targetDate?: Date;
  completed?: Boolean;
};
