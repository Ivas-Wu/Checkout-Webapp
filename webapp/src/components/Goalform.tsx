import Goaltask, { ITask } from './Goaltask';
import React, { useState, ChangeEvent, useEffect } from 'react';
import './Goalform.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Goal { //TOMOVE
  id: number,
  goalName: string,
  goalDesc: string,
  targetDate: Date,
  completed: boolean,
}

export interface IGoalFormProps {}

export const Goalform: React.FC<IGoalFormProps> = () => {
  const userId = 2;
  const tmrw = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const [task, setTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [deadline, setDeadLine] = useState<Date>(new Date);
  const [goalList, setGoalList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
    } else if (event.target.name === 'description') {
      setDescription(event.target.value);
    } 
  };

  const selectDateHandler = (d:Date) => {
    setDeadLine(d)
  }

  useEffect(() => {
    getData();
  }, []);

  function convertGoals(data: Goal[]): ITask[] {
    let returnValue: ITask[] = [];
    data.forEach(function (goal) {
      const newTask = {
        taskName: goal.goalName,
        taskDescription: goal.goalDesc,
        deadline: goal.targetDate,
        id: goal.id,
      };
      returnValue.push(newTask);
    });
    return returnValue;
  }

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/goals?userId=${userId}`)
      .then((res) => {
        let goals: ITask[] = convertGoals(res.data);
        setGoalList(goals);
      });
  };

  const addTask = (): void => {
    let index = goalList.findIndex((element) => element.taskName === task);
    if (index !== -1) {
      //No duplicate names supported
      console.log('No duples pls' + index);
    } else {
      axios
        .post(`http://localhost:3000/api/goals`, {
          goalName: task,
          goalDesc: description,
          targetDate: deadline, //need to change type to match
          userId: userId,
        })
        .then((res) => {
          console.log(res.data);
          getData();
        });
      setTask('');
      setDescription('');
      setDeadLine(tmrw);
    }
  };

  const modifyTask = (taskNameToModify: string): void => {
    let index = goalList.findIndex(
      (element) => element.taskName === taskNameToModify
    );
    if (index === -1) {
      console.log('How did you get here, no task found!');
    } else {
      axios
        .put(`http://localhost:3000/api/goals/` + goalList[index].id, {
          goalName: 'Modified-Placeholder',
          goalDesc: 'Modified',
        })
        .then((res) => {
          console.log(res.data);
          getData();
        });
    }
  };

  const completeTask = (taskNameToDelete: string): void => {
    let index = goalList.findIndex(
      (element) => element.taskName === taskNameToDelete
    );
    if (index === -1) {
      console.log('How did you get here, no task found!');
    } else {
      axios
        .delete(`http://localhost:3000/api/goals/` + goalList[index].id)
        .then((res) => {
          console.log(res.data);
          getData();
        });
    }
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
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={deadline}
            onChange={selectDateHandler}
            minDate={new Date()}
            todayButton={'Today'}
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
