import React, { ChangeEvent, useEffect, useState } from 'react';
import { GoalUpdateReq, GoalCreateReq } from '../types/Goal';
import 'react-widgets/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ITask } from './Goalform';
import TextField from '@mui/material/TextField';
import Button from './Button';

interface ITableModifyProps {
  create: boolean;
  goalsCreateInfo?: (data: GoalCreateReq) => void;
  goalsUpdateInfo?: (data: GoalUpdateReq) => void;
  data?: ITask;
}

export const TableModify: React.FC<ITableModifyProps> = ({
  create,
  goalsCreateInfo,
  goalsUpdateInfo,
  data,
}: ITableModifyProps) => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [goalName, setGoalName] = useState<string | undefined>(undefined);
  const [goalDesc, setGoalDesc] = useState<string | undefined>(undefined);
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'useId') {
      setUserId(Number(event.target.value.replace(/[^0-9.]/g, '')));
    } else if (event.target.name === 'goalName') {
      setGoalName(event.target.value);
    } else if (event.target.name === 'goalDesc') {
      setGoalDesc(event.target.value);
    }
  };

  const selectDateHandler = (d: Date) => {
    setTargetDate(d);
  };

  useEffect(() => {
    if (create) {
      setUserId(Number(localStorage.getItem('user-id')!));
      setTargetDate(new Date());
    } else {
      setGoalName(data?.taskName);
      setGoalDesc(data?.taskDescription);
      setTargetDate(new Date(data?.deadline!));
    }
  }, []);

  const onSubmitCreate = () => {
    let dataReturn: GoalCreateReq = {
      userId: userId ? userId : Number(localStorage.getItem('user-id')!),
      goalName: goalName ? goalName : 'Goal Name was lost in transaction',
      goalDesc: goalDesc,
      targetDate: targetDate,
      completed: false,
    };
    goalsCreateInfo!(dataReturn);
  };

  const onSubmitUpdate = () => {
    let dataReturn: GoalUpdateReq = {
      goalName: goalName,
      goalDesc: goalDesc,
      targetDate: targetDate,
      completed: false,
    };
    goalsUpdateInfo!(dataReturn);
  };

  return (
    <>
      <div>
        <TextField
          required
          id="standard-required"
          label={create ? 'Goal Name...' : 'New Goal Name...'}
          variant="standard"
          style={{ width: '100%' }}
          value={goalName}
          name="goalName"
          onChange={handleChange}
        />
        <TextField
          required
          id="standard-required"
          label={create ? 'Goal Description...' : 'New Goal Description...'}
          variant="standard"
          style={{ width: '100%'}}
          value={goalDesc}
          name="goalDesc"
          onChange={handleChange}
        />
        <div style={{ 
          marginTop: '3%', 
          marginBottom: '3%', 
          }}>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={targetDate}
            onChange={selectDateHandler}
            minDate={new Date()}
            todayButton={'Today'}
          />
        </div>
        <Button
          buttonStyle="btn--extra"
          buttonSize="btn--small"
          onClick={create ? onSubmitCreate : onSubmitUpdate}
        >
          {create ? 'Create' : 'Modify'}
        </Button>
      </div>
    </>
  );
};

export default TableModify;
