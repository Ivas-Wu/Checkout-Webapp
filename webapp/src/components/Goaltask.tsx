import React from 'react';

export interface ITask {
  taskName: string,
  taskDescription: string,
  deadline?: Date,
  id?: number
}

interface IGoalTaskProps {
  task: ITask;
  modifyTask(taskNameToModify: string): void;
  completeTask(taskNameToDelete: string): void;
}

export const Goaltask: React.FC<IGoalTaskProps> = ({
  task,
  modifyTask,
  completeTask,
}: IGoalTaskProps) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.taskName}</span>
        <span>{task.taskDescription}</span>
        <span>{task.deadline ? task.deadline.toUTCString() : "No Deadline"}</span>
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
