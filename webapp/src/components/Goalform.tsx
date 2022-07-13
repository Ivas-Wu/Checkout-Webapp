import Goaltask, { ITask } from './Goaltask';
import React, { useState, ChangeEvent } from 'react';
import './Goalform.css';

export interface IGoalFormProps {}

export const Goalform: React.FC<IGoalFormProps> = () => {
  const [task, setTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [deadline, setDealine] = useState<number>(0);
  const [goalList, setGoalList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
    } else if (event.target.name === 'description') {
      setDescription(event.target.value);
    } else if (event.target.name === 'amount') {
      setAmount(Number(event.target.value));
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {
      taskName: task,
      taskDescription: description,
      amountSpent: amount,
      deadline: deadline,
    };
    setGoalList([...goalList, newTask]);
    setTask('');
    setDealine(0);
  };

  const modifyTask = (taskNameToModify: string): void => {
    let index = goalList.findIndex(
      (element) => element.taskName === taskNameToModify
    );
    console.log(index);
    goalList[index].taskName = 'Modified-Placeholder';
    goalList[index].taskDescription = 'Modified';
    goalList[index].amountSpent = 0;
    goalList[index].deadline = 1;
    setGoalList([...goalList]);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setGoalList(
      goalList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Amount..."
            name="amount"
            value={amount}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Goal</button>
      </div>
      <div className="goalList">
        {goalList.map((task: ITask, key: number) => {
          return (
            <Goaltask
              key={key}
              task={task}
              completeTask={completeTask}
              modifyTask={modifyTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Goalform;
