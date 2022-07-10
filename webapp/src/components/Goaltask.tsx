import React from "react";

export interface ITask {
    taskName: string;
    taskDescription: string;
    amountSpent: number;
    deadline: number;
}

interface IGoalTaskProps {
  task: ITask;
  modifyTask (taskNameToModify: string): void;
  completeTask(taskNameToDelete: string): void;
}

export const Goaltask: React.FC<IGoalTaskProps> = ({ 
  task, modifyTask,completeTask }: IGoalTaskProps
  ) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.taskName}</span>
        <span>{task.taskDescription}</span>
        <span>{task.amountSpent}</span>
        <span>{task.deadline}</span>
      </div>
      <button
        onClick={() => {
          modifyTask(task.taskName);
        }}
      >
        Modify
      </button>
      <button
        onClick={() => {
          completeTask(task.taskName);
        }}
      >
        X
      </button>
    </div>
  );
};

export default Goaltask;